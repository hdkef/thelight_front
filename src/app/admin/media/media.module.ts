import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaComponent } from './media/media.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MediaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:MediaComponent}
    ])
  ]
})
export class MediaModule { }
