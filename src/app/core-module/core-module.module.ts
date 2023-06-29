import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { footerComponent } from './footer/footer.component';
import { navbarComponent } from './navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';
import { NewsListComponent } from '../news-module/news-list/news-list.component';


@NgModule({
  declarations: [
    footerComponent,
    navbarComponent,
    LayoutComponent,
    NewsListComponent,

  ],
  imports: [
    CommonModule,
    
  ],
  exports: [
    footerComponent,
    navbarComponent,
    LayoutComponent
  ]
})
export class CoreModuleModule { }

