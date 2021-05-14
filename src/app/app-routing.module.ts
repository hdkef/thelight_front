import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',pathMatch:'full', redirectTo:'landing-page'},
  {path:'landing-page',loadChildren:()=>{
    return import('./landing-page/landing-page.module').then((m)=>{return m.LandingPageModule})
  }},
  {path:'search',loadChildren:()=>{
    return import('./search/search.module').then((m)=>{return m.SearchModule})
  }},
  {path:'admin',loadChildren:()=>{
    return import('./admin/admin.module').then((m)=>{return m.AdminModule})
  }},
  {path:'view',loadChildren:()=>{
    return import('./article-view/article-view.module').then((m)=>{return m.ArticleViewModule})
  }},
  {path:'about',loadChildren:()=>{
    return import('./about/about.module').then((m)=>{return m.AboutModule})
  }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
