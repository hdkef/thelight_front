import { Injectable } from '@angular/core';
import { Article } from './models/article';
import { Comment } from './models/comment';

@Injectable({
  providedIn: 'root'
})
export class MockArticleService {

  constructor() { }

  public comments:Comment[] = [
    {
      ID:"1a",
      Name:"anonymouse",
      Text:"this is my comment yo",
    },
    {
      ID:"1b",
      Name:"anonymouse",
      Text:"this is my comment yo",
    },
    {
      ID:"1c",
      Name:"anonymouse",
      Text:"this is my comment yo",
    },
  ]
}
