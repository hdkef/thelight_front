import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Media } from 'src/app/models/media';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import * as fromMediaAction from '../../../redux/actions/media-action'

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit, OnDestroy {

  constructor(private store:Store<AppState>) { }
  
  
  ngOnDestroy(): void {
    this.store.dispatch(new fromMediaAction.DestroyMedias())
  }

  mediasasync:Promise<Media[]>

  ngOnInit(): void {
    this.store.select("media").subscribe((data)=>{
      let medias = data["Medias"]
      if (medias){
        this.mediasasync = new Promise((resolve,_)=>{
          resolve(medias)
        })
      }
    })
  }

  onPageEvent(event){
    this.store.dispatch(new fromMediaAction.TryPagingFromClient(event))
  }

}
