import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Article } from 'src/app/models/article';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromArticleAction from '../../redux/actions/article-action'

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit, OnDestroy {


  constructor(private route:ActivatedRoute, private store:Store<AppState>) { }
  
  ngOnDestroy(): void {
    this.store.dispatch(new fromArticleAction.DestroyArticle())
  }

  articleForm:FormGroup
  Tag:string[] = []
  TagString:string = ""
  ImageURL:string = ""

  ngOnInit(): void {
    this.initForm()
    let ID = this.route.snapshot.queryParamMap.get("ID")
    this.store.select("article").subscribe((data)=>{
      console.log(data)
      let article = data["Article"]
      if (article){
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
    this.Tag = article.Tag
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

  goPublish(){
    console.log(this.articleForm.value.Body)
  }

}
