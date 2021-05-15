import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { AdmArticleListComponent } from './adm-article-list/adm-article-list.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DashboardComponent,
    CreateArticleComponent,
    EditArticleComponent,
    AdmArticleListComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',pathMatch:'full',redirectTo:'login'},
      {path:'dashboard',component:DashboardComponent},
      {path:'login',component:LoginComponent},
      {path:'create-article',component:CreateArticleComponent},
      {path:'edit-article',component:EditArticleComponent},
    ]),
    SharedModule,
  ]
})
export class AdminModule { }
