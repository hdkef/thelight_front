import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromAdmArticleAction from '../../redux/actions/adm-article-action'
import * as fromAuthAction from '../../redux/actions/auth-action'

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
    this.store.dispatch(new fromAdmArticleAction.DestroySavedID())
    this.store.dispatch(new fromAdmArticleAction.DestroyInfo())
    this.store.dispatch(new fromAuthAction.DestroyInfo())
  }

  articleForm:FormGroup
  admArticleSubs:Subscription
  authSubs:Subscription
  Tag:string[] = []
  TagString:string = ""
  ImageURL:string = ""
  saveas:boolean = false
  SavedID:Number

  ngOnInit(): void {
    this.authSubs = this.store.select("auth").subscribe((data)=>{
      if (!data["ID"]){
        this.router.navigateByUrl("/admin/login")
      }
    })

    this.admArticleSubs = this.store.select("admarticle").subscribe((data)=>{
      let savedid = data["SavedID"]
      if (savedid){
        this.SavedID = savedid
      }
    })

    this.articleForm = new FormGroup({
      'Title': new FormControl(null, Validators.required),
      'ImageURL': new FormControl(null, Validators.required),
      'addTag': new FormControl(null),
      'Preview': new FormControl(null, [Validators.required, Validators.pattern('^[\w\W]{0,200}$')]),
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
      let tmpTag = [...this.Tag]
      tmpTag.pop()
      this.Tag = tmpTag
      this.TagString = this.Tag.toString()
    }
  }

  goPublish(){
    let payload:Article = this.getPayload()
    payload.ID = null
    this.store.dispatch(new fromAdmArticleAction.PublishStart(payload))
  }

  goSaveAs(){
    let payload:Article = this.getPayload()
    payload.ID = null
    this.store.dispatch(new fromAdmArticleAction.SaveAsStart(payload))
    this.saveas = true
  }

  goSave(){
    let payload:Article = this.getPayload()
    this.store.dispatch(new fromAdmArticleAction.SaveStart(payload))
    this.saveas = true
  }

  goPreview(){
    let payload = this.getPayload()
    payload.ID = null
    payload.Date = new Date().toDateString()
    payload.WriterInfo = {
      ID:0,
      Name:"Preview",
      AvatarURL:"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      Bio:"This is preview for writer's bio, remember this is just a preview",
    }
    this.store.dispatch(new fromAdmArticleAction.PreviewArticleStart(payload))
    this.router.navigateByUrl('/admin/preview')
  }

  getPayload():Article{
    let payload:Article = {
      ID:this.SavedID,
      Date:null, //processed in server
      Title:this.articleForm.value.Title,
      ImageURL:this.articleForm.value.ImageURL,
      Tag:this.Tag,
      Preview:this.articleForm.value.Preview,
      Body:this.articleForm.value.Body,
      WriterInfo:null, //processed in server via jwt claims
    }
    return payload
  }

}
