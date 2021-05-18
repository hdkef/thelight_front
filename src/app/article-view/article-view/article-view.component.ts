import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromArticleAction from '../../redux/actions/article-action'
import { Article } from 'src/app/models/article';
import { Comment } from 'src/app/models/comment';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import { MockArticleService } from 'src/app/mock-article.service';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit, OnDestroy {

  constructor(private router:ActivatedRoute, private store:Store<AppState>, private mock:MockArticleService) { }
  
  ngOnDestroy(): void {
    if (this.articleSubs){
      this.articleSubs.unsubscribe()
    }
    this.store.dispatch(new fromArticleAction.DestroyArticle())
  }

  ID:string
  article:Promise<Article>
  articleSubs:Subscription
  comments:Comment[]
  commentForm:FormGroup
  isCommentLoaded:boolean = false

  ngOnInit(): void {
     this.ID = this.router.snapshot.queryParamMap.get('ID')
     this.articleSubs = this.store.select("article").subscribe((data)=>{
       let article = data["Article"]
       if (article){
         this.article = new Promise((resolve,_)=>{
           resolve(article)
         })
       }
     })
     this.store.dispatch(new fromArticleAction.CheckArticleCache(this.ID))
  }

  createCommentForm(){
    this.commentForm = new FormGroup({
      'Name': new FormControl(null,Validators.required),
      'Text': new FormControl(null,Validators.required),
    })
  }

  showComments(){
    this.createCommentForm()
    this.retrieveComment()
    this.isCommentLoaded = !this.isCommentLoaded
  }

  retrieveComment(){
    this.comments = this.mock.comments
  }

}
