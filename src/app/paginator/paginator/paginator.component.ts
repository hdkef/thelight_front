import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginatorEventService } from '../paginator-event.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnDestroy {

  @Output()pageEvent:EventEmitter<Number> = new EventEmitter()

  curPage = 1
  maxPage = Number.POSITIVE_INFINITY
  maxSubs:Subscription
  curPageSubs:Subscription
  resetSubs:Subscription

  constructor(private pagingEvent:PaginatorEventService) { }
  
  ngOnDestroy(): void {
    if (this.maxSubs){
      this.maxSubs.unsubscribe()
    }
    if (this.curPageSubs){
      this.curPageSubs.unsubscribe()
    }
    if (this.resetSubs){
      this.resetSubs.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.maxSubs = this.pagingEvent.listenMax().subscribe((max)=>{
      this.maxPage = Number(max)
    })
    this.curPageSubs = this.pagingEvent.listenCurPage().subscribe((page)=>{
      this.curPage = Number(page)
    })
    this.resetSubs = this.pagingEvent.listenReset().subscribe((bool)=>{
      if (bool){
        this.curPage = 1
        this.maxPage = Number.POSITIVE_INFINITY
      }
    })
  }

  paginate(i){
    if (this.curPage + i <= 0 || this.curPage +i > this.maxPage){
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
