import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WriterInfoComponent } from './writer-info/writer-info.component';



@NgModule({
  declarations: [
    WriterInfoComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    WriterInfoComponent
  ]
})
export class WriterInfoModule { }
