import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-details/news-details.component';
import { NewsCategoriesComponent } from './news-categories/news-categories.component';
import { UserCommentComponent } from './user-comment/user-comment.component'; // Verifique o caminho correto

@NgModule({
  declarations: [
    NewsDetailComponent,
    NewsCategoriesComponent,
    UserCommentComponent,
    NewsListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule, // Certifique-se de importar o RouterModule
    FormsModule,
  ],
  exports: [
    NewsDetailComponent,
    NewsCategoriesComponent,
    UserCommentComponent,
    NewsListComponent
  ]
})
export class NewsModuleModule { }


