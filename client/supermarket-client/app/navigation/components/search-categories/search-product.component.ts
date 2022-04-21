import { Component, OnInit } from '@angular/core';
import { ProductsStateService } from 'src/app/core/services/state/products-state.service';


@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css'],
})
export class SearchProductComponent implements OnInit {
  constructor(private productsStateService: ProductsStateService) {}

  searchProductFieldValue: string = '';
  onSearchValueChange(value: string) {
    this.productsStateService.setSearchProductFieldValue(value);
  }

  ngOnInit(): void {}
}
