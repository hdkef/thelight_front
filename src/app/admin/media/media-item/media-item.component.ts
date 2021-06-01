import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Media } from 'src/app/models/media';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import {DeleteStart} from '../../../redux/actions/media-action'

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.css']
})
export class MediaItemComponent implements OnChanges {


  @Input()media:Media
  mediaasync:Promise<Media>
  constructor(private store:Store<AppState>) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.media){
      this.mediaasync = new Promise((resolve,_)=>{
        resolve(this.media)
      })
    }
  }

  copyURL(){
    navigator.clipboard.writeText(this.media.ImageURL).then(()=>{
      alert("COPIED")
    },()=>{
      alert(`Failed to copy, try copying this : ${this.media.ImageURL}`)
    })
  }

  goDelete(){
    this.store.dispatch(new DeleteStart(this.media.ID))
  }

}
