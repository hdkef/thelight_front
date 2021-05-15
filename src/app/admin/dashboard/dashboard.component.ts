import { Component, OnInit } from '@angular/core';
import { MockArticleService } from 'src/app/mock-article.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  articles:Article[]

  constructor(private mock:MockArticleService) { }

  ngOnInit(): void {
    this.articles = this.mock.articles
  }

}
