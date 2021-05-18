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
  articles:Article[]
  initArticles:boolean = false

  ngOnInit(): void {
    this.articleSubs = this.store.select("article").subscribe((data)=>{
      this.articles = data["Articles"]
    })
  }

  onPageEvent(page){
    console.log("onPageEvent")
    if (page == 1 && !this.initArticles){
      this.initArticles = !this.initArticles
      this.store.dispatch(new fromArticleAction.GetNewArticles(page))
    }else{
      this.store.dispatch(new fromArticleAction.CheckArticlesCache(page))
    }
  }

}
