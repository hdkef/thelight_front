import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromAuthAction from '../../redux/actions/auth-action'
import * as fromArticleAction from '../../redux/actions/article-action'
import { PaginatorEventService } from 'src/app/paginator/paginator-event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  articles:Promise<Article[]>
  showArticles:boolean = false
  authSubs:Subscription
  articleSubs:Subscription
  totalpage:Number

  constructor(private store:Store<AppState>, private router:Router, private pagingEvent:PaginatorEventService) { }
  
  ngOnDestroy(): void {
    if (this.authSubs){
      this.authSubs.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.authSubs = this.store.select("auth").subscribe((data)=>{
      if (!data["ID"]){
        this.router.navigateByUrl("/admin/login")
      }
    })
    this.store.dispatch(new fromArticleAction.CheckArticlesCache(1))
  }

  goLogout(){
    this.store.dispatch(new fromAuthAction.LogoutStart())
  }

  getArticles(){
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
    this.showArticles = !this.showArticles
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
