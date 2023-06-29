import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { footerComponent } from './footer/footer.component';
import { navbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    footerComponent,
    navbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    footerComponent,
    navbarComponent
  ]
})
export class CoreModuleModule { }

