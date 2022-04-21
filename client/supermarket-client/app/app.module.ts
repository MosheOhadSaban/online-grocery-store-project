import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './core/components/header/header.component';

import { LoginComponent } from './authorization/components/login/login.component';
import { RegisterComponent } from './authorization/components/register/register.component';
import { AppRoutingModule } from './core/modules/app-routing.module';
import { ProductCardComponent } from './shop/components/product-card/product-card.component';
import { CategoriesManuComponent } from './navigation/components/categories-manu/categories-manu.component';
import { AppMaterialModule } from './core/modules/app-material.module';
import { UserAuthModalComponent } from './core/components/modal/modal.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { ContentComponent } from './core/components/content/content.component';
import { CategoriesFilterPipe } from './core/pipes/categories.pipe';
import { SearchProductFilterPipe } from './core/pipes/search-filter.pipe';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LayoutComponent } from './layout.component';
import { AboutComponent } from './home/about/about.component';
import { ReportsComponent } from './home/reports/reports.component';
import { OrderItemsInfoComponent } from './orders/order-items-info/order-items-info.component';
import { CartDisplayBtnComponent } from './shared/components/cart-display-btn/cart-display-btn.component';
import { OrderInfoComponent } from './orders/order-info/order-info.component';
import { HighlightSearch } from './core/pipes/highlightSearch.pipe';
import { OrderSuccessMessageComponent } from './orders/order-success/order-success-message.component';
import { NavBarComponent } from './navigation/components/nav-bar/nav-bar.component';
import { SearchProductComponent } from './navigation/components/search-categories/search-product.component';
import { ProductsContainerComponent } from './shop/components/products-container/products-container.component';
import { ShoppingCartComponent } from './shop/components/shopping-cart/shopping-cart.component';
import { OrderInvoiceComponent } from './orders/order-invoice/order-invoice.component';
import { AdminEditProductComponent } from './admin/admin-edit-product/admin-edit-product.component';
import { AdminAddProductComponent } from './admin/admin-add-product/admin-add-product.component';
import { AdminProductsViewComponent } from './admin/admin-products-view/admin-products-view.component';
import { AddProductViewBtnComponent } from './shared/components/add-product-view-btn/add-product-view-btn.component';



@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    ShoppingCartComponent,
    CategoriesFilterPipe,
    CategoriesManuComponent,
    ProductCardComponent,
    ProductsContainerComponent,
    SearchProductComponent,
    NavBarComponent,
    UserAuthModalComponent,
    SidebarComponent,
    ContentComponent,
    SearchProductFilterPipe,
    AboutComponent,
    ReportsComponent,
    OrderItemsInfoComponent,
    CartDisplayBtnComponent,
    OrderInfoComponent,
    HighlightSearch,
    OrderSuccessMessageComponent,
    OrderInvoiceComponent,
    AdminEditProductComponent,
    AdminAddProductComponent,
    AdminProductsViewComponent,
    AddProductViewBtnComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      tapToDismiss: true,
      preventDuplicates: true,
    }),
    FontAwesomeModule,
    AppMaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [LayoutComponent],
})
export class AppModule {}
