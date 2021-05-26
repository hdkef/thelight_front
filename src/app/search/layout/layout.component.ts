import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromSearchAction from '../../redux/actions/search-action'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {

  articles:Promise<Article[]>
  searchSubs:Subscription
  Page:Number = 1
  Key:string
  Filter:string

  constructor(private store:Store<AppState>, private route:ActivatedRoute, private router:Router) { }
  
  ngOnDestroy(): void {
    if (this.searchSubs){
      this.searchSubs.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.searchSubs = this.store.select("search").subscribe((data)=>{
      let articles = data["Articles"]
      if (articles){
        this.articles = new Promise((resolve,_)=>{
          resolve(articles)
        })
      }
    })

    this.route.queryParams.subscribe((q)=>{
      alert("queryParams")
      let Key = q.Key
      let Filter = q.Filter
      if (Key && Filter){
        this.Key = Key
        this.Filter = Filter
        this.findArticle(Key,Filter,1)
      }
    })

  }

  findArticle(Key:string, Filter:string, Page:Number){
    console.log(Key,Filter,Page)
    alert("findArticle")
    this.store.dispatch(new fromSearchAction.SearchArticlesStart({Page:Page,Key:Key,Filter:Filter}))
  }

  onSearchEvent(event){
    this.router.navigate(["/search"],{queryParams:{
      Key:event.Key,
      Filter:event.Filter,
    }})
    //RESET AND DISPATCH (1)
  }

  onPageEvent(event){
    this.findArticle(this.Key,this.Filter,event)
  }

}
