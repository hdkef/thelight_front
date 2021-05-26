import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article';
import { PaginatorEventService } from 'src/app/paginator/paginator-event.service';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromArticleAction from '../../redux/actions/article-action'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {

  constructor(private store:Store<AppState>, private pagingEvent:PaginatorEventService) { }
  
  ngOnDestroy(): void {
    if (this.articleSubs){
      this.articleSubs.unsubscribe()
    }
  }

  articleSubs:Subscription
  articles:Promise<Article[]>
  totalpage:Number

  ngOnInit(): void {
    this.articleSubs = this.store.select("article").subscribe((data)=>{
      let articles = data["Articles"]
      let totalpage = data["TotalPage"]
      this.totalpage = totalpage
      if (articles){
        this.articles = new Promise((resolve,_)=>{
          resolve(articles)
        })
      }
    })
    this.store.dispatch(new fromArticleAction.CheckArticlesCache(1))
  }

  onPageEvent(page){
    if (page == Number(this.totalpage) + 1 || page <= this.totalpage){
      this.store.dispatch(new fromArticleAction.CheckArticlesCache(page))
    }else{
      this.pagingEvent.emitMax(this.totalpage)
      this.pagingEvent.emitCurPage(this.totalpage)
      return
    }

  }

}
