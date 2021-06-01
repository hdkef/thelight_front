import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Media } from 'src/app/models/media';

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.css']
})
export class MediaItemComponent implements OnChanges {


  @Input()media:Media
  mediaasync:Promise<Media>
  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.media){
      this.mediaasync = new Promise((resolve,_)=>{
        resolve(this.media)
      })
    }
  }

  copyURL(){
    alert("COPIED")
    document.execCommand(this.media.ImageURL)
  }

}
