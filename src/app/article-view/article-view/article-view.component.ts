import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MockArticleService } from 'src/app/mock-article.service';
import { Article } from 'src/app/models/article';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {

  constructor(private router:ActivatedRoute, private mock:MockArticleService) { }

  ID:string
  article:Article
  comments:Comment[]
  commentForm:FormGroup
  isCommentLoaded:boolean = false

  ngOnInit(): void {
     this.ID = this.router.snapshot.queryParamMap.get('ID')
     console.log(this.ID)
     this.article = this.retrieveArticle(this.ID)
  }

  createCommentForm(){
    this.commentForm = new FormGroup({
      'Name': new FormControl(null,Validators.required),
      'Text': new FormControl(null,Validators.required),
    })
  }

  //TOBEIMPLEMENTED
  retrieveArticle(ID){
    let article = this.mock.articles.filter((x=>{return x.ID = ID}))
    return article[0]
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
