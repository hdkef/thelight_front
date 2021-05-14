import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  curPage = 1

  constructor() { }

  ngOnInit(): void {
  }

  paginate(i){
    if (this.curPage + i == 0){
      return
    }else{
      this.curPage +=i
      this.retrieve(this.curPage)
    }
  }

  retrieve(page){
    alert(page)
  }

}
