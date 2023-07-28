import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CartComponent } from '../ecommerce-module/cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductCategoryDetailsComponent } from './product-category-details/product-category-details.component';
import { EcommerceService } from '../services/ecommerce.service';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    ProductCategoriesComponent,
    ProductCategoryDetailsComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    
  ],
  exports: [
    ProductDetailsComponent
  ],
  providers: [EcommerceService]
})
export class EcommerceModuleModule { }
