import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Media } from 'src/app/models/media';
import { PaginatorEventService } from 'src/app/paginator/paginator-event.service';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromMediaAction from '../../../redux/actions/media-action'
import * as fromAuthAction from '../../../redux/actions/auth-action'

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit, OnDestroy {

  constructor(private store:Store<AppState>, private router:Router, private pagingEvent:PaginatorEventService) { }

  mediasasync:Promise<Media[]>
  authSubs:Subscription
  mediaSubs:Subscription
  totalpage:Number = 1

  ngOnDestroy(): void {
    this.store.dispatch(new fromMediaAction.DestroyMedias())
    if (this.authSubs){
      this.authSubs.unsubscribe()
    }
    if (this.mediaSubs){
      this.mediaSubs.unsubscribe()
    }
    this.store.dispatch(new fromMediaAction.DestroyInfo())
    this.store.dispatch(new fromAuthAction.DestroyInfo())
  }

  ngOnInit(): void {
    this.authSubs = this.store.select("auth").subscribe((data)=>{
      if (!data["ID"]){
        this.router.navigateByUrl("/admin/login")
      }
    })
    this.mediaSubs = this.store.select("media").subscribe((data)=>{
      let medias = data["Medias"]
      let totalpage = data["TotalPage"]
      if (totalpage){
        this.totalpage = totalpage
      }
      if (medias){
        this.mediasasync = new Promise((resolve,_)=>{
          resolve(medias)
        })
      }
    })
    this.store.dispatch(new fromMediaAction.TryPaging(1))
  }

  onPageEvent(page){
    if (page == Number(this.totalpage) + 1 || page <= this.totalpage){
      this.store.dispatch(new fromMediaAction.TryPaging(page))
    }else{
      this.pagingEvent.emitMax(this.totalpage)
      this.pagingEvent.emitCurPage(this.totalpage)
      return
    }
  }

}
