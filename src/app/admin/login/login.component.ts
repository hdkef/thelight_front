import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  loginForm:FormGroup

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'Name':new FormControl(null,Validators.required),
      'Pass':new FormControl(null,Validators.required),
    })
  }

}
