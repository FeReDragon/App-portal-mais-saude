import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryDetailsComponent } from './ecommerce-module/product-category-details/product-category-details.component';

const routes: Routes = [
  { path: 'product-category-details', component: ProductCategoryDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
