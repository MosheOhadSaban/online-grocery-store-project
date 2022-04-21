import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductCardData } from 'src/app/core/models/ProductCardData';
import { HttpProductsService } from 'src/app/core/services/http/http-products.service';
import { ProductsStateService } from 'src/app/core/services/state/products-state.service';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css'],
})
export class ProductsContainerComponent implements OnInit {
  constructor(
    private httpProductsService: HttpProductsService,
    private toastr: ToastrService,
    private productsStateService: ProductsStateService
  ) {}

  productsData: ProductCardData[] = [];

  initCardsProductQuantity(value: ProductCardData[]): void {
    for (let index = 0; index < value.length; index++) {
      value[index].quantity = 1;
    }
  }

  ngOnInit(): void {
    this.httpProductsService.getProductsData().subscribe(
      (response) => {
        let serverProductsInfo = response;
        this.initCardsProductQuantity(serverProductsInfo);
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
  }
}
