import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Article } from 'src/app/models/article';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import { DeleteStart } from '../../../redux/actions/adm-article-action'

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnChanges {

  @Input()article:Article
  articleasync:Promise<Article>
  
  constructor(private router:Router, private store:Store<AppState>) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.article){
      this.articleasync = new Promise((resolve,_)=>{
        resolve(this.article)
      })
    }
  }

  goEdit(){
    this.router.navigate(['/admin/edit-article'],{queryParams:{ID:this.article.ID}})
  }

  goDelete(){
    this.store.dispatch(new DeleteStart(this.article.ID))
  }

  goView(){
    this.router.navigate(['view'],{queryParams:{ID:this.article.ID}})
  }

}
