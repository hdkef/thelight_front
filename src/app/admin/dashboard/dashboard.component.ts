import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MockArticleService } from 'src/app/mock-article.service';
import { Article } from 'src/app/models/article';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromAuthAction from '../../redux/actions/auth-action'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  articles:Article[]
  showArticles:boolean = false
  authSubs:Subscription

  constructor(private mock:MockArticleService, private store:Store<AppState>, private router:Router) { }
  
  ngOnDestroy(): void {
    if (this.authSubs){
      this.authSubs.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.authSubs = this.store.select("auth").subscribe((data)=>{
      if (data["ID"] == ""){
        this.router.navigateByUrl("/admin/login")
      }
    })
  }

  goLogout(){
    this.store.dispatch(new fromAuthAction.LogoutStart())
  }

  getArticles(){
    this.articles = this.mock.articles
    this.showArticles = !this.showArticles
  }

  onPageEvent(event){
    alert(event)
  }

}
