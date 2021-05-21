import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromMediaAction from '../../../redux/actions/media-action'

@Component({
  selector: 'app-media-input',
  templateUrl: './media-input.component.html',
  styleUrls: ['./media-input.component.css']
})
export class MediaInputComponent implements OnInit {

  constructor(private store:Store<AppState>,private sanitizer:DomSanitizer) { }

  mediaForm:FormGroup
  fileHolder:File | null

  ngOnInit(): void {
    this.mediaForm = new FormGroup({
      'Image':new FormControl(null, Validators.required)
    })
  }

  onFileChange(event){
    if (event.target.files && event.target.files.length) {
      this.fileHolder = event.target.files[0];
      // this.preview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.fileHolder))
      this.mediaForm.controls.Image.setErrors(null)
    }
  }

  goUpload(){
    this.store.dispatch(new fromMediaAction.MediaFromClient(this.fileHolder))
    this.afterUpload()
  }

  afterUpload(){
    this.mediaForm.controls.Image.setErrors(null)
    this.mediaForm.setValue({'Image':null})
    this.mediaForm.markAsPristine()
    this.mediaForm.markAsUntouched()
    this.fileHolder = null
  }

}
