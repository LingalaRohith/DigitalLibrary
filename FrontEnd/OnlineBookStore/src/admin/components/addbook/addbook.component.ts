import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.scss']
})
export class AddbookComponent {
  AddBookForm = new FormGroup({
    bookTitle: new FormControl('',[Validators.required,Validators.pattern("^[a-z A-Z]+$")]),
    authorname: new FormControl('',[Validators.required,Validators.pattern("^[a-z A-Z]+$")]),
    isbn:new FormControl('',[Validators.required,Validators.pattern("^[a-z A-Z0-9.]+$")]),
    category:new FormControl('',[Validators.required,Validators.pattern("^[a-z A-Z]+$")]),
    publisher:new FormControl('',[Validators.required,Validators.pattern("^[a-z A-Z]+$")]),
    publication_Year:new FormControl('',[Validators.required,Validators.pattern("^[0-9. ]+$")]),
    edition:new FormControl('',[Validators.required,Validators.pattern("^[0-9. ]+$")]),
    buying_Price:new FormControl('',[Validators.required,Validators.pattern("^[0-9. ]+$")]),
    selling_Price:new FormControl('',[Validators.required,Validators.pattern("^[0-9. ]+$")]),
    quantity:new FormControl('',[Validators.required,Validators.pattern("^[0-9 ]+$")]),
    description:new FormControl('',[Validators.required,Validators.pattern("^[a-z A-Z]+$")]),
    image_data:new FormControl('',[Validators.required]),
    isFeatured:new FormControl(false),
    isTopseller:new FormControl(false),
    isNewBook:new FormControl(false)
  });
  constructor(private http:HttpClient,private _snackBar: MatSnackBar,private cart:CartService){}
  addNewBook(){
    if(this.AddBookForm.valid){
    const token = this.cart.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let url="http://localhost:8080/admin/addBook";
    let req={
      "isbn": this.AddBookForm.controls.isbn.value,
      "title": this.AddBookForm.controls.bookTitle.value,
      "author": this.AddBookForm.controls.authorname.value,
      "category": this.AddBookForm.controls.category.value,
      "publisher": this.AddBookForm.controls.publisher.value,
      "publication_Year": this.AddBookForm.controls.publication_Year.value,
      "edition": this.AddBookForm.controls.edition.value,
      "buying_Price": this.AddBookForm.controls.buying_Price.value,
      "selling_Price": this.AddBookForm.controls.selling_Price.value,
      "quantity": this.AddBookForm.controls.quantity.value,
      "description":this.AddBookForm.controls.description.value,
      "image_data": this.AddBookForm.controls.image_data.value,
      "isFeatured": this.AddBookForm.controls.isFeatured.value,
      "isTopseller": this.AddBookForm.controls.isTopseller.value,
      "isNewBook": this.AddBookForm.controls.isNewBook.value
  }
    this.http.post(url,req,{ headers: headers }).subscribe((res:any)=>{
      this._snackBar.open(res.description, "cancel",{"duration": 5000});
    });
  }
  }
  isFeatured(){
    this.AddBookForm.controls.isFeatured.setValue(true);
  }
  isNewBook(){
    this.AddBookForm.controls.isNewBook.setValue(true);
  }
  isBestseller(){
    this.AddBookForm.controls.isTopseller.setValue(true);
  }
}
