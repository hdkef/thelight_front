import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  constructor() { }

  articleForm:FormGroup
  Tag:string[] = []
  TagString:string = ""
  ImageURL:string = ""

  ngOnInit(): void {
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
