import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',pathMatch:'full',redirectTo:'login'},
      {path:'login',component:LoginComponent},
      {path:'dashboard',loadChildren:()=>{
        return import('./dashboard/dashboard.module').then((m)=>{return m.DashboardModule})
      }},
      {path:'create-article',loadChildren:()=>{
        return import('./create-article/create-article.module').then((m)=>{return m.CreateArticleModule})
      }},
      {path:'edit-article',loadChildren:()=>{
        return import('./edit-article/edit-article.module').then((m)=>{return m.EditArticleModule})
      }},
    ]),
    SharedModule,
  ]
})
export class AdminModule { }
