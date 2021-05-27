import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/redux/reducers/app-reducer';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent implements OnInit, OnDestroy {

  constructor(private store:Store<AppState>, private router:Router) { }

  authSubs:Subscription

  ngOnDestroy(): void {
    if (this.authSubs){
      this.authSubs.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.authSubs = this.store.select("auth").subscribe((data)=>{
      if(!data["ID"]){
        this.router.navigateByUrl('/admin/login')
      }
    })
  }

}
