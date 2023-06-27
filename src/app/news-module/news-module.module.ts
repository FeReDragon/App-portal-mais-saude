import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsCategoriesComponent } from './news-categories/news-categories.component';
import { NewsCategoryDetailsComponent } from './news-category-details/news-category-details.component';



@NgModule({
  declarations: [
    NewsListComponent,
    NewsDetailsComponent,
    NewsCategoriesComponent,
    NewsCategoryDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NewsModuleModule { }
