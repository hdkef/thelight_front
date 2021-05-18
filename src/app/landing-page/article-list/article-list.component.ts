import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnChanges {

  @Input()articles:Article[]
  articlesasync:Promise<Article[]>

  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.articles){
      this.articlesasync = new Promise((resolve,_)=>{
        resolve(this.articles)
      })
    }
  }

}
