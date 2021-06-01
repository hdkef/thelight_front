import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/reducers/app-reducer';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent implements OnInit, OnDestroy {

  constructor(private store:Store<AppState>, private router:Router) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

}
