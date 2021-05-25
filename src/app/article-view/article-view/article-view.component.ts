import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromArticleAction from '../../redux/actions/article-action'
import { Article } from 'src/app/models/article';
import { Comment } from 'src/app/models/comment';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromCommentAction from '../../redux/actions/comment-action'

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit, OnDestroy {

  constructor(private router:ActivatedRoute, private store:Store<AppState>) { }
  
  ngOnDestroy(): void {
    if (this.articleSubs){
      this.articleSubs.unsubscribe()
    }
    this.store.dispatch(new fromArticleAction.DestroyArticle())
    if (this.commentSubs){
      this.commentSubs.unsubscribe()
    }
    this.store.dispatch(new fromCommentAction.DestroyComments())
  }

  ID:Number
  article:Promise<Article>
  articleSubs:Subscription
  comments:Promise<Comment[]>
  commentSubs:Subscription
  commentForm:FormGroup
  isCommentLoaded:boolean = false

  ngOnInit(): void {
     this.ID = Number(this.router.snapshot.queryParamMap.get('ID'))
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
    this.commentSubs = this.store.select("comment").subscribe((data)=>{
      if (data["Comments"]){
        this.comments = new Promise((resolve,_)=>{
          resolve(data["Comments"])
        })
      }
    })
    this.store.dispatch(new fromCommentAction.GetComments(this.ID))
  }

  goInsertComment(){
    let payload:Comment = {
      ID:this.ID,
      Name:this.commentForm.value.Name,
      Text:this.commentForm.value.Text,
    }
    this.store.dispatch(new fromCommentAction.InsertComment(payload))
  }

}
