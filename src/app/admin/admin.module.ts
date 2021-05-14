import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { AdmArticleListComponent } from './adm-article-list/adm-article-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashboardComponent,
    CreateArticleComponent,
    EditArticleComponent,
    AdmArticleListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:DashboardComponent}
    ])
  ]
})
export class AdminModule { }
