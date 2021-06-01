import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromDraftAction from '../../../redux/actions/draft-action'
import * as fromAuthAction from '../../../redux/actions/auth-action'
import * as fromAdmArticleAction from '../../../redux/actions/adm-article-action'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  constructor(private store:Store<AppState>, private route:ActivatedRoute, private router:Router) { }

  draftSubs:Subscription
  authSubs:Subscription
  draftForm:FormGroup
  Tag:string[] = []
  ID:Number
  TagString:string
  ImageURL:string = ""

  ngOnDestroy(): void {
    if (this.draftSubs){
      this.draftSubs.unsubscribe()
    }
    if (this.authSubs){
      this.authSubs.unsubscribe()
    }
    this.store.dispatch(new fromDraftAction.DestroyInfo())
    this.store.dispatch(new fromDraftAction.DestroyDraft())
    this.store.dispatch(new fromAuthAction.DestroyInfo())
  }

  ngOnInit(): void {
    this.initForm()
    let ID = Number(this.route.snapshot.queryParamMap.get("ID"))
    this.authSubs = this.store.select("auth").subscribe((data)=>{
      if (!data["ID"]){
        this.router.navigateByUrl("/admin/login")
      }
    })
    this.draftSubs = this.store.select("draft").subscribe((data)=>{
      let draft = data["Draft"]
      if (draft){
        this.setForm(draft)
        this.ID = ID
      }
    })
    this.store.dispatch(new fromDraftAction.CheckCacheDraft(ID))
  }

  initForm(){
    this.draftForm = new FormGroup({
      'Body':new FormControl(null,Validators.required),
      'Title': new FormControl(null,Validators.required),
      'ImageURL':new FormControl(null,Validators.required),
      'addTag': new FormControl(null),
      'Preview':new FormControl(null,[Validators.required, Validators.pattern('^[\w\W]{0,200}$')]),
    })
  }

  setForm(draft:Article){
    this.draftForm.setValue({
      "Title":draft.Title,
      "ImageURL":draft.ImageURL,
      "addTag":null,
      "Body":draft.Body,
      "Preview":draft.Preview,
    })
    this.Tag = draft.Tag
    this.TagString = draft.Tag.toString()
  }

  goSave(){
    let payload:Article = this.getPayload()
    this.store.dispatch(new fromAdmArticleAction.SaveStart(payload))
  }

  peek(){
    this.ImageURL = this.draftForm.value.ImageURL
  }

  addTag(){
    let addedTag = this.draftForm.value.addTag
    if (addedTag){
      this.Tag.push(addedTag)
      this.TagString = this.Tag.toString()
      this.draftForm.patchValue({addTag:null})
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
      Title:this.draftForm.value.Title,
      ImageURL:this.draftForm.value.ImageURL,
      Tag:this.Tag,
      Preview:this.draftForm.value.Preview,
      Body:this.draftForm.value.Body,
      WriterInfo:null, //processed in server via jwt claims
    }
    return payload
  }

}
