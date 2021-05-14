import { Injectable } from '@angular/core';
import { Article } from './models/article';

@Injectable({
  providedIn: 'root'
})
export class MockArticleService {

  constructor() { }

  oneArticle:Article = {
    ID:"1",
    Title:"Title 1",
    Date:"14 May 2021",
    ImageURL:"https://asset.kompas.com/crops/bzdYfkGm3H7fXaDmBLFTedTaSuU=/65x2:633x381/750x500/data/photo/2021/05/12/609ba9cac54a2.png",
    Body:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    WriterInfo:{
      ID:"1w",
      AvatarURL:"https://j4u9x3w3.rocketcdn.me/wp-content/uploads/2020/09/Robertson-2-1024x683.jpeg",
      Bio:"i am a liverpool fan and a golang/js programmer",
      Name:"Hadekha",
    },
    Preview:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    Tag:["test","programming","angular"],
    Comment:[
      {
        ID:"1a",
        Name:"anonymouse",
        Text:"",
      },
      {
        ID:"1b",
        Name:"anonymouse",
        Text:"",
      },
      {
        ID:"1c",
        Name:"anonymouse",
        Text:"",
      },
    ],
  }

  public articles:Article[] = [
    this.oneArticle,
    this.oneArticle,
    this.oneArticle,
    this.oneArticle,
    this.oneArticle,
    this.oneArticle,
    this.oneArticle,
    this.oneArticle,
    this.oneArticle,
  ]
}
