import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnChanges {

  @Input()article:Article
  @Input()from:string
  articleasync:Promise<Article>

  constructor(private router:Router) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.article){
      this.articleasync = new Promise((resolve,_)=>{
        resolve(this.article)
      })
    }
  }

  readMore(){
    if (this.from == "Article" || !this.from){
      this.router.navigate(['view'],{queryParams:{ID:this.article.ID,From:"Article"}})
    }
    else {
      this.router.navigate(['view'],{queryParams:{ID:this.article.ID,From:"Search"}})
    }
  }

}
