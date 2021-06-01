import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Article } from 'src/app/models/article';
import { AppState } from 'src/app/redux/reducers/app-reducer';
import { DeleteStart } from '../../../redux/actions/draft-action'
import {PreviewArticleStart} from '../../../redux/actions/adm-article-action'

@Component({
  selector: 'app-draft-item',
  templateUrl: './draft-item.component.html',
  styleUrls: ['./draft-item.component.css']
})
export class DraftItemComponent implements OnChanges {

  @Input()draft:Article
  draftasync:Promise<Article>

  constructor(private router:Router, private store:Store<AppState>) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.draft){
      this.draftasync = new Promise((resolve,_)=>{
        resolve(this.draft)
      })
    }
  }

  goEdit(){
    this.router.navigate(['/admin/draft/edit'],{queryParams:{ID:this.draft.ID}})
  }

  goDelete(){
    this.store.dispatch(new DeleteStart(this.draft.ID))
  }

  goView(){
    this.store.dispatch(new PreviewArticleStart(this.draft))
  }

  

}
