import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaComponent } from './media/media.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MediaItemComponent } from './media-item/media-item.component';
import { MediaInputComponent } from './media-input/media-input.component';
import { PaginatorModule } from 'src/app/paginator/paginator.module';



@NgModule({
  declarations: [
    MediaComponent,
    MediaItemComponent,
    MediaInputComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:MediaComponent}
    ]),
    ReactiveFormsModule,
    PaginatorModule,
  ],
  exports:[
    MediaComponent,
    MediaItemComponent,
    MediaInputComponent,
  ]
})
export class MediaModule { }
