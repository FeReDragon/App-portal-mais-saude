import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EcommerceModuleModule { }
