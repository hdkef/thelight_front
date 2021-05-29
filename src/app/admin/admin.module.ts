import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

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
      {path:'media',loadChildren:()=>{
        return import('./media/media.module').then((m)=>{return m.MediaModule})
      }},
      {path:'settings',loadChildren:()=>{
        return import('./settings/settings.module').then((m)=>{return m.SettingsModule})
      }},
      {path:'draft',loadChildren:()=>{
        return import('./draft/draft.module').then((m)=>{return m.DraftModule})
      }},
      {path:'preview',loadChildren:()=>{
        return import('./article-preview/article-preview.module').then((m)=>{return m.ArticlePreviewModule})
      }},
      {path:'analyze',loadChildren:()=>{
        return import('./analyze/analyze.module').then((m)=>{return m.AnalyzeModule})
      }},
    ]),
    ReactiveFormsModule
  ],
  providers:[]
})
export class AdminModule { }
