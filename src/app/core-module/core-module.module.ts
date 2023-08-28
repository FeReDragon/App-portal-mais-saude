import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';
import { NewsListComponent } from '../news-module/news-list/news-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserCommentComponent } from '../news-module/user-comment/user-comment.component';
import { NewsModuleModule } from '../news-module/news-module.module';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    LayoutComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NewsModuleModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    LayoutComponent,
  ]
})
export class CoreModuleModule { }
