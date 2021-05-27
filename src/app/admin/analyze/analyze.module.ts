import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyzeComponent } from './analyze.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AnalyzeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:AnalyzeModule}
    ])
  ]
})
export class AnalyzeModule { }
