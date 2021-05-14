import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MockArticleService } from 'src/app/mock-article.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {

  constructor(private router:ActivatedRoute, private mock:MockArticleService) { }

  ID:string
  article:Article

  ngOnInit(): void {
     this.ID = this.router.snapshot.queryParamMap.get('ID')
     console.log(this.ID)
     this.article = this.retrieveArticle(this.ID)
  }

  //TOBEIMPLEMENTED
  retrieveArticle(ID){
    let article = this.mock.articles.filter((x=>{return x.ID = ID}))
    return article[0]
  }

}
