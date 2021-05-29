import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromDraftAction from '../../../redux/actions/draft-action'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  constructor(private store:Store<AppState>, private route:ActivatedRoute) { }

  draftSubs:Subscription
  Tag:string[] = []
  TagString:string
  ImageURL:string = ""

  ngOnDestroy(): void {
    if (this.draftSubs){
      this.draftSubs.unsubscribe()
    }
    this.store.dispatch(new fromDraftAction.DestroyInfo())
    this.store.dispatch(new fromDraftAction.DestroyDraft())
  }

  ngOnInit(): void {
    this.initForm()
    this.draftSubs = this.store.select("draft").subscribe((data)=>{
      let draft = data["Draft"]
      if (draft){
        this.setForm(draft)
      }
    })
    let ID = Number(this.route.snapshot.queryParamMap.get("ID"))
    this.store.dispatch(new fromDraftAction.CheckCacheDraft(ID))
  }

  initForm(){

  }

  setForm(draft:Article){

  }

  goSave(){

  }

  peek(){

  }

  addTag(){

  }

  removeTag(){
    
  }

}
