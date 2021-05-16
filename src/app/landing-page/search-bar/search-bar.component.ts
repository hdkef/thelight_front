import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private router:Router) { }

  searchForm:FormGroup

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      'Key': new FormControl(null, Validators.required),
      'Filter': new FormControl('Title'),
    })
  }

  goSearch(){
    this.router.navigate(['search'],{queryParams:{
      Key:this.searchForm.value.Key,
      Filter:this.searchForm.value.Filter
    }})
  }

}
