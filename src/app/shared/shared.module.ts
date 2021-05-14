import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
  ],
  exports:[
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ]
})
export class SharedModule { }
