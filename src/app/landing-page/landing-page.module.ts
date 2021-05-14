import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ArticleItemModule } from '../article-item/article-item.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { PaginatorModule } from '../paginator/paginator.module';



@NgModule({
  declarations: [
    SearchBarComponent,
    HeaderComponent,
    LandingPageComponent,
    ArticleListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:LandingPageComponent},
    ]),
    SharedModule,
    ArticleItemModule,
    PaginatorModule,
  ]
})
export class LandingPageModule { }
