import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { ArticleItemComponent } from './article-item/article-item.component';
import { PaginatorModule } from 'src/app/paginator/paginator.module';



@NgModule({
  declarations: [
    DashboardComponent,
    ArticleItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:DashboardComponent}
    ]),
    PaginatorModule,
  ]
})
export class DashboardModule { }
