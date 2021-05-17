import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromAuthAction from 'src/app/redux/actions/auth-action'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private store:Store<AppState>, private router:Router) { }

  ngOnDestroy(): void {
    if (this.authSubs){
      this.authSubs.unsubscribe()
    }
  }

  loginForm:FormGroup
  authSubs:Subscription

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'Name':new FormControl(null,Validators.required),
      'Pass':new FormControl(null,Validators.required),
    })
    this.authSubs = this.store.select("auth").subscribe((data)=>{
      if (data["ID"] != ""){
        this.router.navigateByUrl("/admin/dashboard")
      }
    })
  }

  goLogin(){
    let Name = this.loginForm.value.Name
    let Pass = this.loginForm.value.Pass
    this.store.dispatch(new fromAuthAction.LoginStart({Name,Pass}))
  }

}
