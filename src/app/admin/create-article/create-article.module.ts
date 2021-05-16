import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleComponent } from './create-article.component';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill'
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateArticleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:CreateArticleComponent}
    ]),
    ReactiveFormsModule,
    QuillModule.forRoot({
      modules:{
        toolbar:[
          ['bold','italic','underline','strike'],
          ['blockquote','code-block'],
          [{'header':1},{'header':2}],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': ['black','white','red','yellow','green','blue'] }, { 'background': ['yellow','red','green','blue','black','white'] }],
          ['clean'],
          ['link', 'image', 'video'],
        ]
      }
    }),
  ]
})
export class CreateArticleModule { }
