
import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from 'src/app/services/cart.service';

interface Product {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-searchbooks',
  templateUrl: './searchbooks.component.html',
  styleUrls: ['./searchbooks.component.scss'],
  encapsulation:ViewEncapsulation.None
  
})
export class SearchbooksComponent {
  products: Product[] = [
    { value: 'title', viewValue: 'Title' },
    { value: 'author', viewValue: 'Author' },
    { value: 'publisher', viewValue: 'Publisher' },
  ];

  SearchForm = new FormGroup({
    filterOption: new FormControl(''),
    userInput: new FormControl('')
  });
  req: any;
  thumbnail: any;
  constructor(public cart:CartService,public http:HttpClient,private sanitizer:DomSanitizer){}
  doSearch() {
    let category=this.cart.category_opt;
    let url="http://localhost:8080/users/filterBook";
    this.req={
      "bookName":"",
      "category_motivation":(category)?category.motivation:'',
      "category_drama":(category)?category.drama:'',
      "category_suspense":(category)?category.suspense:'',
      "category_fantasy":(category)?category.fantasy:'',
      "price":(category)?category.price:'',
      "author":"",
      "publisher":""

    }
    if(this.SearchForm.controls.filterOption.value == 'title'){
      this.req.bookName=this.SearchForm.controls.userInput.value;
    }else if(this.SearchForm.controls.filterOption.value == 'author'){
      this.req.author=this.SearchForm.controls.userInput.value;
    }else{
      this.req.publisher=this.SearchForm.controls.userInput.value;
    }
    this.http.post(url,this.req).subscribe((res:any)=>{
      this.cart.results=res.details;
      this.cart.showBacktoResults=true;
    })
  }
}
