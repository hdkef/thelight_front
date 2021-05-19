import { Component, OnInit } from '@angular/core';
import { MockMediaService } from 'src/app/mock-media.service';
import { Media } from 'src/app/models/media';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  constructor(private mockmed:MockMediaService) { }

  mediasasync:Promise<Media[]>

  ngOnInit(): void {
    this.mediasasync = new Promise((resolve,_)=>{
      resolve(this.mockmed.medias)
    })
  }

  onPageEvent(event){
    alert(event)
  }

}
