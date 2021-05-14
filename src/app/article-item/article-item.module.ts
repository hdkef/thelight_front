import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleItemComponent } from './article-item/article-item.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ArticleItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports:[
    ArticleItemComponent,
  ]
})
export class ArticleItemModule { }
