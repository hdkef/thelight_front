import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromAdmArticleAction from '../../redux/actions/adm-article-action'

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.css']
})
export class ArticlePreviewComponent implements OnInit, OnDestroy {

  constructor(private store:Store<AppState>) { }

  admArticleSubs:Subscription
  article:Promise<Article>

  ngOnDestroy(): void {
    if (this.admArticleSubs){
      this.admArticleSubs.unsubscribe()
    }
    this.store.dispatch(new fromAdmArticleAction.PreviewArticleDestroy())
  }

  ngOnInit(): void {
    this.admArticleSubs = this.store.select("admarticle").subscribe((data)=>{
      let article = data["Article"]
      if (article){
        this.article = new Promise((resolve,_)=>{
          resolve(article)
        })
      }
    })
  }

}
