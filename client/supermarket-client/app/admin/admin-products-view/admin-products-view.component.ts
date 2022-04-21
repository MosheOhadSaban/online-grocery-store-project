import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductCardData } from 'src/app/core/models/ProductCardData';
import { HttpProductsService } from 'src/app/core/services/http/http-products.service';
import { ProductsStateService } from 'src/app/core/services/state/products-state.service';
import { UiAccessStateService } from 'src/app/core/services/state/ui-access-state.service';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products-view',
  templateUrl: './admin-products-view.component.html',
  styleUrls: ['./admin-products-view.component.css'],
})
export class AdminProductsViewComponent {
  constructor(
    private productsStateService: ProductsStateService,
    private httpProductsService: HttpProductsService,
    private uiAccessStateService: UiAccessStateService,
    private ProductsStateService: ProductsStateService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  faPenSquareIcon = faPenSquare;
  ProductCardsData: ProductCardData[] = [];
  categoryId: number = 0;
  searchProductFieldValue: string = '';
  private searchProductFieldValueSubscription: Subscription =
    new Subscription();
  private ProductCardsDataSubscription: Subscription = new Subscription();
  private categoryNameSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.httpProductsService.getProductsData().subscribe(
      (response) => {
        let serverProductsInfo = response;

        this.productsStateService.setProductsData(serverProductsInfo);
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
    this.ProductCardsDataSubscription =
      this.productsStateService.productsData$.subscribe((value) => {
        this.ProductCardsData = value;
      });
    this.categoryNameSubscription =
      this.productsStateService.categoryId$.subscribe((value) => {
        this.categoryId = value;
      });
    this.searchProductFieldValueSubscription =
      this.productsStateService.searchProductFieldValue$.subscribe((value) => {
        this.searchProductFieldValue = value;
      });
    this.uiAccessStateService.setIsSidebarIsdisplayed(false);
  }

  ngOnDestroy(): void {
    this.ProductCardsDataSubscription.unsubscribe();
    this.categoryNameSubscription.unsubscribe();
    this.searchProductFieldValueSubscription.unsubscribe();
  }

  onEditClick(product: ProductCardData) {
    this.uiAccessStateService.setIsModalActive(true);
    this.router.navigate([{ outlets: { modal: ['edit-product'] } }]);
    this.productsStateService.setCurrentProductToEdit(product);
  }
}
