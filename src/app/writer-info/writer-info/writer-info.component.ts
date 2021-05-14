import { Component, Input, OnInit } from '@angular/core';
import { WriterInfo } from 'src/app/models/writerinfo';

@Component({
  selector: 'app-writer-info',
  templateUrl: './writer-info.component.html',
  styleUrls: ['./writer-info.component.css']
})
export class WriterInfoComponent implements OnInit {

  @Input()writer:WriterInfo

  constructor() { }

  ngOnInit(): void {
  }

}
