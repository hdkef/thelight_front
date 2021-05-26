import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromAuthAction from '../../redux/actions/auth-action'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  constructor(private store:Store<AppState>, private router:Router) { }

  authSubs:Subscription
  settingsForm:FormGroup
  fileHolder:File | null
  ID:Number
  Name:string
  Bio:string
  AvatarURL:string

  ngOnDestroy(): void {
    if (this.authSubs){
      this.authSubs.unsubscribe()
    }
    this.store.dispatch(new fromAuthAction.DestroyInfo())
  }

  ngOnInit(): void {
    this.initForm()
    this.authSubs = this.store.select("auth").subscribe((data)=>{
      let ID = data["ID"]
      if (!ID){
        this.router.navigateByUrl("/admin/login")
      }else{
        this.ID = ID
        this.Name = data["Name"]
        this.AvatarURL = data["AvatarURL"]
        this.Bio = data["Bio"]
        this.setForm()
      }
    })
  }

  initForm(){
    this.settingsForm = new FormGroup({
      'Name':new FormControl(null),
      'Bio': new FormControl(null),
      'Avatar': new FormControl(null),
    })
  }

  setForm(){
    this.settingsForm.setValue({
      Name:this.Name,Bio:this.Bio,Avatar:null,
    })
  }

  onFileChange(event){
    if (event.target.files && event.target.files.length) {
      this.fileHolder = event.target.files[0];
      // this.preview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.fileHolder))
      this.settingsForm.controls.Avatar.setErrors(null)
    }
  }

  goSubmitChanges(){
    let Name = this.settingsForm.value.Name
    let Bio = this.settingsForm.value.Bio
    let ID = this.ID
    let File = this.fileHolder
    if (!File && !Bio && !Name){
      alert("cannot post empty request")
      return
    }
    let formData = new FormData()
    if (Name && Name != this.Name){
      formData.append('Name',Name)
    }
    if (Bio && Bio != this.Bio){
      formData.append('Bio',Bio)
    }
    if (File){
      let name = "AVATAROF" + ID
      formData.append('Avatar',File,name)
    }
    this.store.dispatch(new fromAuthAction.PostSettings(formData))
    this.afterSubmitChanges()
  }

  afterSubmitChanges(){
    this.settingsForm.controls.Avatar.setErrors(null)
    this.settingsForm.setValue({'Bio':null,'Avatar':null,'Name':null})
    this.settingsForm.markAsTouched()
    this.settingsForm.markAsPristine()
    this.settingsForm.markAsUntouched()
    this.fileHolder = null
  }

}
