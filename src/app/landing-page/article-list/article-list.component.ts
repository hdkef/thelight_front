import { Component, OnInit } from '@angular/core';
import { MockArticleService } from 'src/app/mock-article.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles:Article[]

  constructor(private mock:MockArticleService) { }

  ngOnInit(): void {
    this.articles = this.mock.articles
  }

}
