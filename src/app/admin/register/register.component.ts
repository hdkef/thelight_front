import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import {RegisterStart} from '../../redux/actions/auth-action'
import {EmailVerStart} from '../../redux/actions/auth-action'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private store:Store<AppState>) { }

  registerForm:FormGroup
  emailverForm:FormGroup

  ngOnInit(): void {
    this.emailverForm = new FormGroup({
      'Name': new FormControl(null,Validators.required),
      'Pass': new FormControl(null,Validators.required),
      'Email': new FormControl(null,[Validators.required,Validators.email]),
    })
    this.registerForm = new FormGroup({
      'Code': new FormControl(null,Validators.required),
    })
  }

  goEmailVer(){
    let Name = this.registerForm.value.Name
    let Pass = this.registerForm.value.Pass
    let Email = this.registerForm.value.Email
    this.store.dispatch(new EmailVerStart({Name,Pass,Email}))
  }

  goRegister(){
    let Email = this.registerForm.value.Email
    let Code = this.registerForm.value.Code
    this.store.dispatch(new RegisterStart({Email,Code}))
  }

}
