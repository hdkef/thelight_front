import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article';
import { PaginatorEventService } from 'src/app/paginator/paginator-event.service';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromDraftAction from '../../../redux/actions/draft-action'

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit, OnDestroy {

  constructor(private store:Store<AppState>, private pagingEvent:PaginatorEventService) { }

  drafts:Promise<Article[]>
  draftsSubs:Subscription
  totalpage:Number = 1

  ngOnDestroy(): void {
    if (this.draftsSubs){
      this.draftsSubs.unsubscribe()
    }
    this.store.dispatch(new fromDraftAction.DestroyInfo())
  }

  ngOnInit(): void {
    this.draftsSubs = this.store.select("draft").subscribe((data)=>{
      let drafts = data["Drafts"]
      let totalpage = data["TotalPage"]
      if (totalpage){
        this.totalpage = totalpage
      }
      if (drafts){
        this.drafts = new Promise((resolve,_)=>{
          resolve(drafts)
        })
      }
    })
    this.store.dispatch(new fromDraftAction.CheckCacheDrafts(1))
  }

  onPageEvent(page){
    if (page == Number(this.totalpage) + 1 || page <= this.totalpage){
      this.store.dispatch(new fromDraftAction.CheckCacheDrafts(page))
    }else{
      this.pagingEvent.emitMax(this.totalpage)
      this.pagingEvent.emitCurPage(this.totalpage)
      return
    }
  }

}
