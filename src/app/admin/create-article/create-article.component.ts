import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromAdmArticleAction from '../../redux/actions/adm-article-action'

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit, OnDestroy {

  constructor(private store:Store<AppState>, private router:Router) { }
  
  ngOnDestroy(): void {
    if (this.authSubs){
      this.authSubs.unsubscribe()
    }
    if (this.admArticleSubs){
      this.admArticleSubs.unsubscribe()
    }
  }

  articleForm:FormGroup
  admArticleSubs:Subscription
  authSubs:Subscription
  Tag:string[] = []
  TagString:string = ""
  ImageURL:string = ""
  saveas:boolean = false
  ID:Number

  ngOnInit(): void {
    this.authSubs = this.store.select("auth").subscribe((data)=>{
      if (!data["ID"]){
        this.router.navigateByUrl("/admin/login")
      }
    })

    this.admArticleSubs = this.store.select("admarticle").subscribe((data)=>{
      let savedid = data["SavedID"]
      if (savedid){
        this.ID = savedid
      }
    })

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

  goPublish(){
    let payload:Article = {
      ID:null, //new ID created in db, not client
      Date:null, //processed in server
      Title:this.articleForm.value.Title,
      ImageURL:this.articleForm.value.ImageURL,
      Tag:this.Tag,
      Preview:null, //processed in server
      Body:this.articleForm.value.Body,
      WriterInfo:null, //processed in server via jwt claims
    }
    this.store.dispatch(new fromAdmArticleAction.PublishStart(payload))
    console.log("GO PUBLISH", payload)
  }

  goSaveAs(){
    let payload:Article = {
      ID:null,
      Date:null, //processed in server
      Title:this.articleForm.value.Title,
      ImageURL:this.articleForm.value.ImageURL,
      Tag:this.Tag,
      Preview:null, //processed in server
      Body:this.articleForm.value.Body,
      WriterInfo:null, //processed in server via jwt claims
    }
    this.store.dispatch(new fromAdmArticleAction.SaveAsStart(payload))
    this.saveas = true
    console.log("GO SAVE AS")
  }

  goSave(){
    let payload:Article = {
      ID:this.ID,
      Date:null, //processed in server
      Title:this.articleForm.value.Title,
      ImageURL:this.articleForm.value.ImageURL,
      Tag:this.Tag,
      Preview:null, //processed in server
      Body:this.articleForm.value.Body,
      WriterInfo:null, //processed in server via jwt claims
    }
    this.store.dispatch(new fromAdmArticleAction.SaveStart(payload))
    this.saveas = true
    console.log("GO SAVE")
  }

  goPreview(){
    console.log("GO PREVIEW")
  }

}
