import { ShoppingCart } from 'src/app/core/models/ShoppingCart';
import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faTruck, faDolly} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { HttpAuthService } from 'src/app/core/services/http/http-auth.service';
import { UserAddress } from 'src/app/core/models/UserAddress';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ShoppingCartsStateService } from 'src/app/core/services/state/shopping-carts-state.service';
import { Order } from 'src/app/core/models/Order';
import { HttpOrdersService } from 'src/app/core/services/http/http-orders.service';
import { HttpShoppingCartsService } from 'src/app/core/services/http/http-shopping-carts.service';
import { UiAccessStateService } from 'src/app/core/services/state/ui-access-state.service';
import { OrdersStateService } from 'src/app/core/services/state/orders-state.service';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css'],
})
export class OrderInfoComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private httpAuthService: HttpAuthService,
    private toastr: ToastrService,
    private shoppingCartsStateService: ShoppingCartsStateService,
    private httpOrdersService: HttpOrdersService,
    private httpShoppingCartsService: HttpShoppingCartsService,
    private uiAccessStateService: UiAccessStateService,
    private ordersStateService: OrdersStateService
  ) {}
  ngOnDestroy(): void {
    this.shoppingCartSubscription.unsubscribe();
  }

  faTruckIcon = faTruck;
  faDollyIcon = faDolly;

  citiesArray: Array<string> = [
    'Tel-Aviv',
    'Haifa',
    'Jerusalem',
    'Eilat',
    'Beersheba',
    'Ashdod',
    'Rishon LeZion',
    'Holon',
  ];

  todayDate = new Date().toISOString().split('T')[0];

  shoppingCartInfo: ShoppingCart = {
    cartId: 0,
    userId: 0,
    cartDate: '',
    totalPrice: 0,
    cartItems: [],
    totatPrice: 0,
  };

  userAddress: UserAddress = {
    city: '',
    street: '',
  };
  private shoppingCartSubscription: Subscription = new Subscription();

  orderInfoForm!: FormGroup;

  ngOnInit(): void {
    this.orderInfoForm = new FormGroup({
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      creditCard: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
        Validators.pattern("^[0-9]*$")
      ]),
    });

    this.httpAuthService.getUserAddress().subscribe(
      (response) => {
        this.userAddress = response;
        this.orderInfoForm.patchValue({
          city: this.userAddress.city,
          street: this.userAddress.street,
        });
      },
      (serverErrorResponse) => {
        if (serverErrorResponse.error.message == undefined) {
          this.toastr.error(serverErrorResponse.message, 'Error Message:', {
            timeOut: 4000,
          });
        } else {
          this.toastr.error(
            serverErrorResponse.error.message,
            'Error Message:',
            {
              timeOut: 4000,
            }
          );
        }
      }
    );
    this.shoppingCartSubscription =
      this.shoppingCartsStateService.shoppingCart$.subscribe((value) => {
        this.shoppingCartInfo = value;
      });
  }

  get city() {
    return this.orderInfoForm.get('city');
  }
  get street() {
    return this.orderInfoForm.get('street');
  }
  get date() {
    return this.orderInfoForm.get('date');
  }
  get creditCard() {
    return this.orderInfoForm.get('creditCard');
  }

  onOrderClick(): void {
    const orderInfo: Order = {
      date: new Date().toDateString(),
      totalPrice: this.shoppingCartInfo.totalPrice,
      deliveryCity: this.orderInfoForm.get('city')?.value,
      deliveryStreet: this.orderInfoForm.get('street')?.value,
      deliveryDate: this.orderInfoForm
        .get('date')
        ?.value.split('-')
        .reverse()
        .join('-'),
      creditCardNumber: this.orderInfoForm.get('creditCard')?.value.substr(-4),
      cartId: this.shoppingCartInfo.cartId,
      userId: this.shoppingCartInfo.userId,
    };
    this.httpOrdersService.addOrder(orderInfo).subscribe(
      (response) => {
        this.httpShoppingCartsService
          .deleteShoppingCart(orderInfo.cartId)
          .subscribe(
            () => {},
            (serverErrorResponse) => {
              if (serverErrorResponse.error.message == undefined) {
                this.toastr.error(
                  serverErrorResponse.message,
                  'Error Message:',
                  {
                    timeOut: 4000,
                  }
                );
              } else {
                this.toastr.error(
                  serverErrorResponse.error.message,
                  'Error Message:',
                  {
                    timeOut: 4000,
                  }
                );
              }
            }
          );
        this.ordersStateService.setOrderInfo(orderInfo);
        this.uiAccessStateService.setIsModalActive(true);
        this.router.navigate([{ outlets: { modal: ['success-order'] } }]);
        this.toastr.success(response, 'Message:', {
          timeOut: 8000,
        });
      },
      (serverErrorResponse) => {
        if (serverErrorResponse.error.message == undefined) {
          this.toastr.error(serverErrorResponse.message, 'Error Message:', {
            timeOut: 4000,
          });
        } else {
          this.toastr.error(
            serverErrorResponse.error.message,
            'Error Message:',
            {
              timeOut: 4000,
            }
          );
        }
      }
    );
  }
}
