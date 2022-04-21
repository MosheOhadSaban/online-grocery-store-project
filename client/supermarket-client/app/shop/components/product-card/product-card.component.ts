import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faMinus,
  faPlus,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ProductCardData } from 'src/app/core/models/ProductCardData';
import { ProductsStateService } from 'src/app/core/services/state/products-state.service';
import { ShoppingCartsStateService } from 'src/app/core/services/state/shopping-carts-state.service';
import { UiAccessStateService } from 'src/app/core/services/state/ui-access-state.service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit, OnDestroy {
  constructor(
    private shoppingCartsStateService: ShoppingCartsStateService,
    private productsStateService: ProductsStateService,

  ) {}

  ProductCardsData: ProductCardData[] = [];
  categoryId: number = 0;
  faMinus = faMinus;
  faPlus = faPlus;
  faShoppingCart = faShoppingCart;
  searchProductFieldValue: string = '';

  private searchProductFieldValueSubscription: Subscription =
    new Subscription();
  private ProductCardsDataSubscription: Subscription = new Subscription();
  private categoryNameSubscription: Subscription = new Subscription();

  onQuantityPlusClick(quantity: number): number {
    quantity++;
    return quantity;
  }

  onQuantityMinusClick(quantity: number): number {
    if (quantity !== 1) {
      quantity--;
    }
    return quantity;
  }

  onAddItemClick(product: ProductCardData): void {
    this.shoppingCartsStateService.addShoppingCartItem(product);
    product.quantity = product.quantity + 1 - 1;
  }

  ngOnInit(): void {
    
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


  }

  ngOnDestroy(): void {
    this.ProductCardsDataSubscription.unsubscribe();
    this.categoryNameSubscription.unsubscribe();
    this.searchProductFieldValueSubscription.unsubscribe();
  }
}
