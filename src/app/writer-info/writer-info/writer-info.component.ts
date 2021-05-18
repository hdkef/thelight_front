import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WriterInfo } from 'src/app/models/writerinfo';

@Component({
  selector: 'app-writer-info',
  templateUrl: './writer-info.component.html',
  styleUrls: ['./writer-info.component.css']
})
export class WriterInfoComponent implements OnChanges {

  @Input()writer:WriterInfo
  writerasync:Promise<WriterInfo>

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.writer){
      this.writerasync = new Promise((resolve,_)=>{
        resolve(this.writer)
      })
    }
  }

  

}
