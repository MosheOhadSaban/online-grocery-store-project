import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  faShoppingCart,
  faTrash,
  faMinus,
  faPlus,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/core/models/CartItem';
import { ShoppingCart } from 'src/app/core/models/ShoppingCart';
import { HttpShoppingCartsService } from 'src/app/core/services/http/http-shopping-carts.service';
import { ShoppingCartsStateService } from 'src/app/core/services/state/shopping-carts-state.service';
import { UiAccessStateService } from 'src/app/core/services/state/ui-access-state.service';
import { ProductsStateService } from 'src/app/core/services/state/products-state.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  constructor(
    private httpShoppingCartsService: HttpShoppingCartsService,
    private shoppingCartsStateService: ShoppingCartsStateService,
    private router: Router,
    private uiAccessStateService: UiAccessStateService,
    private productsStateService: ProductsStateService,
    private toastr: ToastrService
  ) {}

  faShoppingCartIcon = faShoppingCart;
  faTrashIcon = faTrash;
  faMinusIcon = faMinus;
  faPlusIcon = faPlus;
  faMoneyBillIcon = faMoneyBill;

  public shoppingCartInfo: ShoppingCart = {
    cartId: 0,
    userId: 0,
    cartDate: '',
    totalPrice: 0,
    cartItems: [],
    totatPrice: 0,
  };
  isCartIsdisplayed: boolean = true;

  private isCartIsdisplayedSubscription: Subscription = new Subscription();
  private shoppingCartSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.httpShoppingCartsService.getShoppingCart().subscribe(
      (response) => {
        this.shoppingCartsStateService.setShoppingCart(response);
        this.shoppingCartsStateService.setCartTotalPrice();
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
      this.shoppingCartsStateService.shoppingCart$.subscribe((cartData) => {
        this.shoppingCartInfo = cartData;
      });
    this.shoppingCartInfo.totalPrice = 0;

    this.shoppingCartsStateService.initServerCartItems(
      this.shoppingCartInfo.cartItems
    );

    this.isCartIsdisplayedSubscription =
      this.uiAccessStateService.isSidebarIsdisplayed$.subscribe((value) => {
        this.isCartIsdisplayed = value;
      });
    this.shoppingCartsStateService.setCartTotalPrice();

    this.router.events.subscribe((event) => {
      if (this.router.url == '/shop(sidebar:shop)') {
        this.productsStateService.setSearchProductFieldValue('');
      }
    });
  }

  ngOnDestroy(): void {
    this.shoppingCartSubscription.unsubscribe();
    this.isCartIsdisplayedSubscription.unsubscribe();
  }

  onPlusClick(cartItem: CartItem): void {
    cartItem.quantity++;
    cartItem.quantityPrice = cartItem.quantity * cartItem.productPrice;
    this.shoppingCartsStateService.onItemQuantityChange(cartItem);
  }

  onMinusClick(cartItem: CartItem, shoppingCartId: number): void {
    if (cartItem.quantity == 1) {
      this.shoppingCartsStateService.DeleteCartItem(
        cartItem.productId,
        shoppingCartId
      );
    }
    cartItem.quantity--;
    cartItem.quantityPrice = cartItem.quantity * cartItem.productPrice;
    console.log(cartItem.productPrice);
    this.shoppingCartsStateService.onItemQuantityChange(cartItem);
  }
  onDeleteClick(productId: number, shoppingCartId: number): void {
    this.shoppingCartsStateService.DeleteCartItem(productId, shoppingCartId);
  }

  onEmptyShoppingCartClick(shoppingCartId: number): void {
    this.shoppingCartsStateService.emptyShoppingCart(shoppingCartId);
  }

  onCheckoutClick() {
    if (this.shoppingCartInfo.cartItems.length != 0) {
      this.router.navigate([
        { outlets: { primary: 'order', sidebar: 'order' } },
      ]);
    } else {
      this.toastr.error(
        'The purchase cannot be completed when the cart is empty',
        'Message:',
        {
          timeOut: 4000,
        }
      );
    }
  }
}
