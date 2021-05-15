import { Component, OnInit } from '@angular/core';
import { MockArticleService } from 'src/app/mock-article.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  articles:Article[]

  constructor(private mock:MockArticleService) { }

  ngOnInit(): void {
    this.articles = this.mock.articles
  }

}
