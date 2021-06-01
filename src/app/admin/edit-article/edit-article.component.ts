import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromArticleAction from '../../redux/actions/article-action'
import * as fromAdmArticleAction from '../../redux/actions/adm-article-action'
import * as fromAuthAction from '../../redux/actions/auth-action'

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit, OnDestroy {


  constructor(private route:ActivatedRoute, private store:Store<AppState>, private router:Router) { }
  

  articleForm:FormGroup
  authSubs:Subscription
  admArticleSubs:Subscription
  Tag:string[] = []
  TagString:string = ""
  ImageURL:string = ""
  ID:Number 
  SavedID:Number //this ID is for ID using in save as and save not ID of article that will be published / edited
  saveas:boolean = false

  ngOnDestroy(): void {
    this.store.dispatch(new fromArticleAction.DestroyArticle())
    if (this.authSubs){
      this.authSubs.unsubscribe()
    }
    this.store.dispatch(new fromAdmArticleAction.DestroyInfo())
    this.store.dispatch(new fromArticleAction.DestroyArticle())
    this.store.dispatch(new fromAuthAction.DestroyInfo())
  }

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

    this.initForm()
    
    let ID = Number(this.route.snapshot.queryParamMap.get("ID"))
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
      "Preview":article.Preview,
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
      'Preview': new FormControl(null, [Validators.required, Validators.pattern('^[\w\W]{0,200}$')]),
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

  goSave(){
    let payload:Article = this.getPayload()
    payload.ID = this.SavedID
    this.store.dispatch(new fromAdmArticleAction.SaveStart(payload))
  }

  goSaveAs(){
    let payload:Article = this.getPayload()
    payload.ID = null
    this.store.dispatch(new fromAdmArticleAction.SaveAsStart(payload))
    this.saveas = true
  }

  goEdit(){
    let payload:Article = this.getPayload()
    this.store.dispatch(new fromAdmArticleAction.EditStart(payload))
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
      ID:this.ID,
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
