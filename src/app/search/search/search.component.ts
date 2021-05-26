import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output()searchEvent:EventEmitter<{Key:string,Filter:string}> = new EventEmitter<{Key:string,Filter:string}>()

  constructor(private route:ActivatedRoute) { }

  searchForm:FormGroup

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      'Key': new FormControl(null,Validators.required),
      'Filter': new FormControl('Title')
    })

    let Key = this.route.snapshot.queryParamMap.get("Key")
    let Filter = this.route.snapshot.queryParamMap.get("Filter")
    if (Key && Filter){
      this.searchForm.setValue({Key:Key,Filter:Filter})
    }

  }

  goSearch(){
    let Key = this.searchForm.value.Key
    let Filter = this.searchForm.value.Filter
    this.searchEvent.emit({Key,Filter})
  }

}
