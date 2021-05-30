import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article';
import { PaginatorEventService } from 'src/app/paginator/paginator-event.service';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromSearchAction from '../../redux/actions/search-action'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {

  articles:Promise<Article[]>
  searchSubs:Subscription
  from:string = "Search"
  Page:Number = 1
  Key:string
  Filter:string
  totalpage:Number = 1

  constructor(private store:Store<AppState>, private route:ActivatedRoute, private router:Router, private pagingEvent:PaginatorEventService) { }
  
  ngOnDestroy(): void {
    if (this.searchSubs){
      this.searchSubs.unsubscribe()
    }
    this.store.dispatch(new fromSearchAction.SearchReset())
  }

  ngOnInit(): void {
    this.searchSubs = this.store.select("search").subscribe((data)=>{
      let articles = data["Articles"]
      let totalpage = data["TotalPage"]
      if (totalpage){
        this.totalpage = totalpage
      }
      if (articles){
        this.articles = new Promise((resolve,_)=>{
          resolve(articles)
        })
      }
    })

    this.route.queryParams.subscribe((q)=>{
      let Key = q.Key
      let Filter = q.Filter
      if (Key && Filter){
        this.Key = Key
        this.Filter = Filter
        this.findArticle(Key,Filter,1)
      }
    })

  }

  findArticle(Key:string, Filter:string, Page:Number){
    this.store.dispatch(new fromSearchAction.CheckSearchCache({Page:Page,Key:Key,Filter:Filter}))
  }

  onSearchEvent(event){
    this.router.navigate(["/search"],{queryParams:{
      Key:event.Key,
      Filter:event.Filter,
    }})
    this.reset()
  }

  onPageEvent(page){
    if (page == Number(this.totalpage) + 1 || page <= this.totalpage){
      this.findArticle(this.Key,this.Filter,page)
    }else{
      this.pagingEvent.emitMax(this.totalpage)
      this.pagingEvent.emitCurPage(this.totalpage)
      return
    }
    // this.findArticle(this.Key,this.Filter,event)
  }

  reset(){
    this.store.dispatch(new fromSearchAction.SearchReset())
    this.totalpage = 1
    this.pagingEvent.emitReset()
  }

}
