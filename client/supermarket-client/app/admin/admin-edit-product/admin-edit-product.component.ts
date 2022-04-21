import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CategoriesData } from 'src/app/core/models/CategoriesData';
import { ProductCardData } from 'src/app/core/models/ProductCardData';
import { HttpAdminService } from 'src/app/core/services/http/admin.service';

import { HttpUploadService } from 'src/app/core/services/http/http-upload.service';
import { ProductsStateService } from 'src/app/core/services/state/products-state.service';
import { UiAccessStateService } from 'src/app/core/services/state/ui-access-state.service';

@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.css'],
})
export class AdminEditProductComponent implements OnInit, OnDestroy {
  constructor(
    private uiAccessStateService: UiAccessStateService,
    private router: Router,
    private productsStateService: ProductsStateService,
    private httpUploadService: HttpUploadService,
    private httpAdminService: HttpAdminService,
    private toastr: ToastrService
  ) {}

  faPenSquareIcon = faPenSquare;
  imageFileName: string = '';
  imagePathUrlClient: string = '';
  imagePathUrlServer: string = '';
  imgaeFile!: File;
  productsData: ProductCardData[] = [];
  currentProductToEdit: ProductCardData = {
    id: 0,
    name: '',
    price: 0,
    imagePath: '',
    amountByUnit: 0,
    unitMeasurement: 0,
    categoryId: 0,
    quantity: 0,
  };
  prodcutCategories: CategoriesData[] = [];

  editProductForm!: FormGroup;
  private ProductDataSubscription: Subscription = new Subscription();
  private currentProductToEditSubscription: Subscription = new Subscription();
  private CategoriesDataSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.editProductForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      amountByUnit: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      unitMeasurement: new FormControl(null, [Validators.required]),
      categoryName: new FormControl(null, Validators.required),
    });
    this.ProductDataSubscription =
      this.productsStateService.productsData$.subscribe((value) => {
        this.productsData = value;
      });

    this.currentProductToEditSubscription =
      this.productsStateService.currentProductToEdit$.subscribe((value) => {
        this.currentProductToEdit = value;
        this.editProductForm.patchValue({
          name: this.currentProductToEdit.name,
          price: this.currentProductToEdit.price,
          amountByUnit: this.currentProductToEdit.amountByUnit,
          unitMeasurement: this.currentProductToEdit.unitMeasurement,
          categoryName: this.productsStateService.getCategoryById(
            this.currentProductToEdit.categoryId
          ),
        });
        this.imagePathUrlClient = this.currentProductToEdit.imagePath;
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
    this.editProductForm.get('categoryName')?.setValue(e.target.value, {
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
      this.httpUploadService.uploadFile(this.imgaeFile).subscribe(
        (response) => {
          this.imagePathUrlServer = response;
          this.toastr.success('Successfully uploaded', 'Message:', {
            timeOut: 3000,
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

  setImagePath(): string {
    if (this.imagePathUrlServer == '') {
      return this.imagePathUrlClient;
    } else {
      return this.imagePathUrlServer;
    }
  }

  onSavaClick() {
    const productData: ProductCardData = {
      id: this.currentProductToEdit.id,
      name: this.editProductForm.get('name')?.value,
      price: this.editProductForm.get('price')?.value,
      imagePath: this.setImagePath(),
      amountByUnit: this.editProductForm.get('amountByUnit')?.value,
      unitMeasurement: this.editProductForm.get('unitMeasurement')?.value,
      categoryId: this.productsStateService.getCategoryIdByName(
        this.editProductForm.get('categoryName')?.value
      ),

      quantity: this.currentProductToEdit.quantity,
    };

    this.httpAdminService.editProduct(productData).subscribe(
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
