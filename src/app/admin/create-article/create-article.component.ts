import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/redux/reducers/app-reducer';

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
  }

  articleForm:FormGroup
  authSubs:Subscription
  Tag:string[] = []
  TagString:string = ""
  ImageURL:string = ""

  ngOnInit(): void {
    this.authSubs = this.store.select("auth").subscribe((data)=>{
      if (!data["ID"]){
        this.router.navigateByUrl("/admin/login")
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
    console.log(this.articleForm.value.Body)
  }

  returnPreview(){
    //TOBE IMPLEMENTED return preview text from Body
    let spliceBody = this.articleForm.value.Body
  }

}
