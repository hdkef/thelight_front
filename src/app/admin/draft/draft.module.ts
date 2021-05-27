import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraftComponent } from './draft.component';
import { RouterModule } from '@angular/router';
import { DraftViewOneComponent } from './draft-view-one/draft-view-one.component';
import { DraftViewAllComponent } from './draft-view-all/draft-view-all.component';



@NgModule({
  declarations: [
    DraftComponent,
    DraftViewOneComponent,
    DraftViewAllComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:DraftComponent}
    ])
  ]
})
export class DraftModule { }
