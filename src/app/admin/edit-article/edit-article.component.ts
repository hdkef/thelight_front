import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MockArticleService } from 'src/app/mock-article.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit, OnDestroy {


  constructor(private route:ActivatedRoute, private mock:MockArticleService) { }
  
  ngOnDestroy(): void {
    
  }

  articleForm:FormGroup
  Tag:string[] = []
  TagString:string = ""
  ImageURL:string = ""

  ngOnInit(): void {
    let ID = this.route.snapshot.queryParamMap.get("ID")
    let article = this.mock.articles.filter((x=>{return x.ID = ID}))[0]
    this.initiation(article)
  }

  initiation(article:Article){
    this.articleForm = new FormGroup({
      'Title': new FormControl(article.Title, Validators.required),
      'ImageURL': new FormControl(article.ImageURL, Validators.required),
      'addTag': new FormControl(null),
      'Body': new FormControl(article.Body, Validators.required),
    })
    this.Tag = article.Tag
    this.TagString = this.Tag.toString()
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
