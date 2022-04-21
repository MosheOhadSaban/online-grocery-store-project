import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriesData } from 'src/app/core/models/CategoriesData';
import { HttpProductsService } from 'src/app/core/services/http/http-products.service';
import { ProductsStateService } from 'src/app/core/services/state/products-state.service';


@Component({
  selector: 'app-categories-manu',
  templateUrl: './categories-manu.component.html',
  styleUrls: ['./categories-manu.component.css'],
})
export class CategoriesManuComponent implements OnInit {
  constructor(
    private httpProductsService: HttpProductsService,
    private toastr: ToastrService,
    private productsStateService: ProductsStateService
  ) {}
  categoriesData: CategoriesData[] = [];

  initCategoriesTabsActiveView(): void {
    for (let index = 0; index < this.categoriesData.length; index++) {
      if (this.categoriesData[index].name === 'All') {
        this.categoriesData[index].isActiveTab = true;
      } else {
        this.categoriesData[index].isActiveTab = false;
      }
    }
  }

  activateNewTab(categoryId: number): void {
    for (let index = 0; index < this.categoriesData.length; index++) {
      if (categoryId === this.categoriesData[index].id) {
        this.categoriesData[index].isActiveTab = true;
      } else {
        this.categoriesData[index].isActiveTab = false;
      }
    }
  }

  setCategory(value: number): void {
    this.productsStateService.setCategoryId(value);
  }

  onLoadInitCurrentCategory(value: CategoriesData[]): void {
    for (let index = 0; index < value.length; index++) {
      if ('All' == value[index].name) {
        this.productsStateService.setCategoryId(value[index].id);
      }
    }
  }

  ngOnInit(): void {
    this.httpProductsService.getProductsCategoriesData().subscribe(
      (response) => {
        this.categoriesData = response;
        this.onLoadInitCurrentCategory(this.categoriesData);
        this.productsStateService.setProdcutCategories(this.categoriesData)
        this.initCategoriesTabsActiveView();
      },
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
  }
}
