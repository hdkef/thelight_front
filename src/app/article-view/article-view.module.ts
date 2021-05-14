import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleViewComponent } from './article-view/article-view.component';
import { RouterModule } from '@angular/router';
import { WriterInfoModule } from '../writer-info/writer-info.module';



@NgModule({
  declarations: [
    ArticleViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:ArticleViewComponent},
    ]),
    WriterInfoModule,
  ]
})
export class ArticleViewModule { }
