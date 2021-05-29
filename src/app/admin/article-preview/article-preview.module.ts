import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlePreviewComponent } from './article-preview.component';
import { RouterModule } from '@angular/router';
import { WriterInfoModule } from 'src/app/writer-info/writer-info.module';



@NgModule({
  declarations: [
    ArticlePreviewComponent
  ],
  imports: [
    CommonModule,
    WriterInfoModule,
    RouterModule.forChild([
      {path:'',component:ArticlePreviewComponent}
    ])
  ]
})
export class ArticlePreviewModule { }
