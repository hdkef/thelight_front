import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }

  searchForm:FormGroup

  ngOnInit(): void {
    let Key = this.route.snapshot.queryParamMap.get("Key")
    let Filter = this.route.snapshot.queryParamMap.get("Filter")
    this.searchForm = new FormGroup({
      'Key': new FormControl(null,Validators.required),
      'Filter': new FormControl('Title')
    })
    if (Key && Filter){
      this.searchForm.setValue({Key:Key,Filter:Filter})
      this.findArticle(Key,Filter)
    }
  }

  goSearch(){
    let Key = this.searchForm.value.Key
    let Filter = this.searchForm.value.Filter
    this.findArticle(Key,Filter)
  }

  findArticle(Key:string, Filter:string){
    console.log(Key,Filter)
  }

}
