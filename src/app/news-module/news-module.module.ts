import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsCategoriesComponent } from './news-categories/news-categories.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NewsDetailsComponent,
    NewsCategoriesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class NewsModuleModule { }
