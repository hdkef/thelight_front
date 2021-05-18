import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromArticleAction from '../../redux/actions/article-action'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {

  constructor(private store:Store<AppState>) { }
  
  ngOnDestroy(): void {
    if (this.articleSubs){
      this.articleSubs.unsubscribe()
    }
  }

  articleSubs:Subscription
  articles:Promise<Article[]>

  ngOnInit(): void {
    this.articleSubs = this.store.select("article").subscribe((data)=>{
      let articles = data["Articles"]
      if (articles){
        this.articles = new Promise((resolve,_)=>{
          resolve(articles)
        })
      } 
    })
  }

  onPageEvent(page){
    console.log("onPageEvent")
    this.store.dispatch(new fromArticleAction.CheckArticlesCache(page))
  }

}
