import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {

  @Input()article:Article

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  readMore(){
    this.router.navigate(['view'],{queryParams:{ID:this.article.ID}})
  }

}
