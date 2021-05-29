import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-draft-item',
  templateUrl: './draft-item.component.html',
  styleUrls: ['./draft-item.component.css']
})
export class DraftItemComponent implements OnChanges {

  @Input()draft:Article
  draftasync:Promise<Article>

  constructor(private router:Router) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.draft){
      this.draftasync = new Promise((resolve,_)=>{
        resolve(this.draft)
      })
    }
  }

  goEdit(){
    alert("goedit")
    this.router.navigate(['/admin/draft/edit'],{queryParams:{ID:this.draft.ID}})
  }

  goDelete(){
    alert("godelete")
    // this.store.dispatch(new DeleteStart(this.draft.ID))
  }

  goView(){
    alert("goview")
    // this.router.navigate(['view'],{queryParams:{ID:this.draft.ID}})
  }

  

}
