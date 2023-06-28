import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductCategoryDetailsComponent } from './product-category-details/product-category-details.component';
import { EcommerceService } from '../services/ecommerce.service'; // Importação do serviço

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    ProductCategoriesComponent,
    ProductCategoryDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [EcommerceService] // Fornecimento do serviço
})
export class EcommerceModuleModule { }
