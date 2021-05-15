import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ArticleItemModule } from '../article-item/article-item.module';
import { PaginatorModule } from '../paginator/paginator.module';
import { LayoutComponent } from './layout/layout.component';



@NgModule({
  declarations: [
    SearchComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:LayoutComponent},
    ]),
    SharedModule,
    ArticleItemModule,
    PaginatorModule,
  ]
})
export class SearchModule { }
