import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnChanges {

  @Input()article:Article
  articleasync:Promise<Article>
  
  constructor(private router:Router) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.article){
      this.articleasync = new Promise((resolve,_)=>{
        resolve(this.article)
      })
    }
  }

  goEdit(){
    this.router.navigate(['/admin/edit-article'],{queryParams:{ID:this.article.ID}})
  }

  goView(){
    this.router.navigate(['view'],{queryParams:{ID:this.article.ID}})
  }

}
