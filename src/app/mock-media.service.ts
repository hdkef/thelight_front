import { Injectable } from '@angular/core';
import { Media } from './models/media';

@Injectable({
  providedIn: 'root'
})
export class MockMediaService {

  constructor() { }

  oneMedia:Media = {
    ID:"1",
    ImageURL:"https://pbs.twimg.com/profile_images/1363210545118150659/Uo-XiGtv_400x400.jpg",
  }

  medias:Media[] = [
    this.oneMedia,
    this.oneMedia,
    this.oneMedia,
    this.oneMedia,
    this.oneMedia,
    this.oneMedia,
  ]
}
