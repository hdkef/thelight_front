import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ViewAllComponent } from './view-all/view-all.component';
import { DraftItemComponent } from './draft-item/draft-item.component';
import { PaginatorModule } from 'src/app/paginator/paginator.module';



@NgModule({
  declarations: [
    ViewAllComponent,
    DraftItemComponent,
  ],
  imports: [
    CommonModule,
    PaginatorModule,
    RouterModule.forChild([
      {path:'',pathMatch:'full', redirectTo:'view-all'},
      {path:'view-all',component:ViewAllComponent},
      {path:'edit',loadChildren:()=>{
        return import('./edit/edit.module').then((m)=>{return m.EditModule})
      }},
    ])
  ]
})
export class DraftModule { }
