import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromArticleAction from '../../redux/actions/article-action'
import * as fromAdmArticleAction from '../../redux/actions/adm-article-action'

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit, OnDestroy {


  constructor(private route:ActivatedRoute, private store:Store<AppState>, private router:Router) { }
  
  ngOnDestroy(): void {
    this.store.dispatch(new fromArticleAction.DestroyArticle())
    if (this.authSubs){
      this.authSubs.unsubscribe()
    }
  }

  articleForm:FormGroup
  authSubs:Subscription
  Tag:string[] = []
  TagString:string = ""
  ImageURL:string = ""
  ID:string

  ngOnInit(): void {
    this.authSubs = this.store.select("auth").subscribe((data)=>{
      if (!data["ID"]){
        this.router.navigateByUrl("/admin/login")
      }
    })
    this.initForm()
    let ID = this.route.snapshot.queryParamMap.get("ID")
    this.store.select("article").subscribe((data)=>{
      let article = data["Article"]
      if (article){
        this.ID = article.ID
        this.setForm(article)
      }
    })
    this.store.dispatch(new fromArticleAction.CheckArticleCache(ID))
  }

  setForm(article:Article){
    this.articleForm.setValue({
      "Title":article.Title,
      "ImageURL":article.ImageURL,
      "addTag":null,
      "Body":article.Body,
    })
    this.Tag = [...article.Tag]
    this.TagString = this.Tag.toString()
  }

  initForm(){
    this.articleForm = new FormGroup({
      'Title': new FormControl(null, Validators.required),
      'ImageURL': new FormControl(null, Validators.required),
      'addTag': new FormControl(null),
      'Body': new FormControl(null, Validators.required),
    })
  }

  peek(){
    this.ImageURL = this.articleForm.value.ImageURL
  }

  addTag(){
    let addedTag = this.articleForm.value.addTag
    if (addedTag){
      this.Tag.push(addedTag)
      this.TagString = this.Tag.toString()
      this.articleForm.patchValue({addTag:null})
    }
  }

  removeTag(){
    if (this.Tag.length > 0){
      this.Tag.pop()
      this.TagString = this.Tag.toString()
    }
  }

  goSave(){
    let payload:Article = {
      ID:null, //if ID is null, then server will store draft and respond with new ID and that new ID must be sent
      Date:null, //processed in server
      Title:this.articleForm.value.Title,
      ImageURL:this.articleForm.value.ImageURL,
      Tag:this.Tag,
      Preview:null, //processed in server
      Body:this.articleForm.value.Body,
      WriterInfo:null, //processed in server via jwt claims
    }
    this.store.dispatch(new fromAdmArticleAction.SaveStart(payload))
    console.log("GO SAVE")
  }

  goEdit(){
    let payload:Article = {
      ID:this.ID, //article ID that want to be updated
      Date:null, //processed in server (add edited on bla/bla/bla)
      Title:this.articleForm.value.Title,
      ImageURL:this.articleForm.value.ImageURL,
      Tag:this.Tag,
      Preview:null, //processed in server
      Body:this.articleForm.value.Body,
      WriterInfo:null, //processed in server via jwt claims
    }
    this.store.dispatch(new fromAdmArticleAction.EditStart(payload))
    console.log("GO EDIT")
  }

}
