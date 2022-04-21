import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CategoriesData } from 'src/app/core/models/CategoriesData';
import { ProductCardData } from 'src/app/core/models/ProductCardData';
import { HttpAdminService } from 'src/app/core/services/http/admin.service';

import { HttpUploadService } from 'src/app/core/services/http/http-upload.service';
import { ProductsStateService } from 'src/app/core/services/state/products-state.service';
import { UiAccessStateService } from 'src/app/core/services/state/ui-access-state.service';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css'],
})
export class AdminAddProductComponent implements OnInit, OnDestroy {
  constructor(
    private uiAccessStateService: UiAccessStateService,
    private router: Router,
    private productsStateService: ProductsStateService,
    private httpUploadService: HttpUploadService,
    private httpAdminService: HttpAdminService,
    private toastr: ToastrService
  ) {}

  faPlusIcon = faPlus;
  productsData: ProductCardData[] = [];
  prodcutCategories: CategoriesData[] = [];
  imgaeFile!: File;
  imageFileName: string = '';
  imagePathUrlClient: string = '';
  imagePathUrlServer: string = '';
  addProductForm!: FormGroup;
  private ProductDataSubscription: Subscription = new Subscription();
  private currentProductToEditSubscription: Subscription = new Subscription();
  private CategoriesDataSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      amountByUnit: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      unitMeasurement: new FormControl(null, [
        Validators.required,
     
      ]),
      categoryName: new FormControl(null, Validators.required),
    });
    this.addProductForm
      .get('categoryName')
      ?.patchValue({ categoryName: 'Category' });

    this.ProductDataSubscription =
      this.productsStateService.productsData$.subscribe((value) => {
        this.productsData = value;
      });
    this.CategoriesDataSubscription =
      this.productsStateService.ProdcutCategories$.subscribe((value) => {
        this.prodcutCategories = value.filter(
          (category) => category.name != 'All'
        );
      });
  }
  ngOnDestroy(): void {
    this.ProductDataSubscription.unsubscribe();
    this.currentProductToEditSubscription.unsubscribe();
    this.CategoriesDataSubscription.unsubscribe();
  }

  changeCategory(e: any) {
    this.addProductForm.get('categoryName')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  onExitClick() {
    this.uiAccessStateService.setIsModalActive(false);
    this.router.navigate([
      { outlets: { primary: 'admin-products-view', modal: null } },
    ]);
  }

  onImageSelected(event: Event | any) {
    if (event.target.files) {
      let file = event.target.files[0];
      this.imageFileName = file.name;
      this.imgaeFile = <File>event.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = (event: any) => {
        this.imagePathUrlClient = event.target.result;
      };
    }
  }

  onImageUploadClick() {
    if (this.imgaeFile) {
      this.httpUploadService
        .uploadFile(this.imgaeFile)
        .subscribe((response) => {

          this.imagePathUrlServer = response;
          this.toastr.success('Successfully uploaded', 'Message:', {
            timeOut: 3000,
          });
        },      (serverErrorResponse) => {
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
        });
    }
  }

  onSavaClick() {
    console.log('clicked');
    const productData: ProductCardData = {
      name: this.addProductForm.get('name')?.value,
      price: this.addProductForm.get('price')?.value,
      imagePath: this.imagePathUrlServer,
      amountByUnit: this.addProductForm.get('amountByUnit')?.value,
      unitMeasurement: this.addProductForm.get('unitMeasurement')?.value,
      categoryId:this.productsStateService.getCategoryIdByName(this.addProductForm.get('categoryName')?.value) ,

      quantity: 0,
      id: 0,
    };

    this.httpAdminService.addProduct(productData).subscribe(
      (response) => {
        this.toastr.success(response, 'Message:', {
          timeOut: 3000,
        });
        this.productsStateService.editProduct(productData);
        this.uiAccessStateService.setIsModalActive(false);
        this.router.navigate([
          { outlets: { primary: 'admin-products-view', modal: null } },
        ]);
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
