import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.scss']
})
export class EditbookComponent {
  EditBookForm = new FormGroup({
    price: new FormControl('',[Validators.required,Validators.pattern("[0-9. ]")]),
  });
  constructor(public cart:CartService,public http:HttpClient,private _snackBar: MatSnackBar){
    console.log(this.cart.editbook);
    this.EditBookForm.controls.price.setValue(this.cart.editbook.price);
  }
  save_book(){
    if(this.EditBookForm.valid){
    const token = this.cart.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let url="http://localhost:8080/admin/editBook";
    let req={
      "bookId":this.cart.editbook.bookId,
    "selling_Price":this.EditBookForm.controls.price.value,
  }
    this.http.post(url,req,{ headers: headers }).subscribe((res:any)=>{
      if(res.status){
        this._snackBar.open(res.message, "cancel",{"duration": 5000});
      }
    });
  }
  }
}
