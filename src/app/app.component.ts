import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './redux/reducers/app-reducer';
import * as fromAuthAction from './redux/actions/auth-action'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private store:Store<AppState>){}
  
  ngOnInit(): void {
    this.store.dispatch(new fromAuthAction.AutoLoginStart())
  }

  title = 'angular';
}
