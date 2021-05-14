import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleViewComponent } from './article-view/article-view.component';
import { RouterModule } from '@angular/router';
import { ArticleItemComponent } from '../article-item/article-item/article-item.component';



@NgModule({
  declarations: [
    ArticleViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:ArticleItemComponent},
    ]),
  ]
})
export class ArticleViewModule { }
