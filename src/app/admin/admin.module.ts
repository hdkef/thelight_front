import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminGuard } from './admin.guard';
import { LoginGuard } from './login.guard';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',pathMatch:'full',redirectTo:'login'},
      {path:'login',component:LoginComponent, canActivate:[LoginGuard]},
      {path:'dashboard', canActivate:[AdminGuard],loadChildren:()=>{
        return import('./dashboard/dashboard.module').then((m)=>{return m.DashboardModule})
      }},
      {path:'create-article', canActivate:[AdminGuard],loadChildren:()=>{
        return import('./create-article/create-article.module').then((m)=>{return m.CreateArticleModule})
      }},
      {path:'edit-article', canActivate:[AdminGuard],loadChildren:()=>{
        return import('./edit-article/edit-article.module').then((m)=>{return m.EditArticleModule})
      }},
      {path:'media', canActivate:[AdminGuard],loadChildren:()=>{
        return import('./media/media.module').then((m)=>{return m.MediaModule})
      }},
      {path:'settings', canActivate:[AdminGuard],loadChildren:()=>{
        return import('./settings/settings.module').then((m)=>{return m.SettingsModule})
      }},
      {path:'draft', canActivate:[AdminGuard],loadChildren:()=>{
        return import('./draft/draft.module').then((m)=>{return m.DraftModule})
      }},
      {path:'preview', canActivate:[AdminGuard],loadChildren:()=>{
        return import('./article-preview/article-preview.module').then((m)=>{return m.ArticlePreviewModule})
      }},
      {path:'analyze', canActivate:[AdminGuard],loadChildren:()=>{
        return import('./analyze/analyze.module').then((m)=>{return m.AnalyzeModule})
      }},
    ]),
    ReactiveFormsModule
  ],
  providers:[AdminGuard, LoginGuard]
})
export class AdminModule { }
