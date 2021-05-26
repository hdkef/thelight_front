import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginatorEventService {

  resetEvent:EventEmitter<boolean> = new EventEmitter()
  maxEvent:EventEmitter<Number> = new EventEmitter()
  curPageEvent:EventEmitter<Number> = new EventEmitter()
  
  constructor() { }

  emitReset(){
    this.resetEvent.emit(true)
  }

  emitMax(max){
    this.maxEvent.emit(max)
  }

  emitCurPage(page){
    this.curPageEvent.emit(page)
  }

  listenReset(){
    return this.resetEvent
  }

  listenMax(){
    return this.maxEvent
  }

  listenCurPage(){
    return this.curPageEvent
  }

}
