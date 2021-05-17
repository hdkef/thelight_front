import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Output()pageEvent:EventEmitter<Number> = new EventEmitter()

  curPage = 1

  constructor() { }

  ngOnInit(): void {
  }

  paginate(i){
    if (this.curPage + i == 0){
      return
    }else{
      this.curPage +=i
      this.emitPagingEvent(this.curPage)
    }
  }

  emitPagingEvent(page){
    this.pageEvent.emit(page)
  }

}
