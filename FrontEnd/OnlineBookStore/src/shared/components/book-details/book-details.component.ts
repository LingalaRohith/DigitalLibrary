import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  quantity_old: any;
  total_amount: any;
  constructor(public cart:CartService,private http:HttpClient,private _snackBar: MatSnackBar){

  }
  ngonInit(){
      console.log(this.cart.selected_book);
  }
  changeQuantity( item: any, _quantity: any){
    const token = this.cart.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let url="http://localhost:8080/users/updateCart";
    let req={
      "cartId":item.cartId,
      "bookId":item.bookId,
      "quantity":item.quantity,
      "price":item.price,
      "userId":item.userId
    }
    this.http.post(url,req,{ headers: headers }).subscribe((res:any)=>{
      if(res.statusCodeValue==200){
      item.quantity=_quantity;
      this.getItem();
      }else{
        this._snackBar.open(res.body, "cancel",{"duration": 5000});
      }
    });
  }
  getItem() {
    const token = this.cart.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let url="http://localhost:8080/users/getCartBooks";
    
    this.http.get(url,{ headers: headers }).subscribe((res)=>{
      this.cart.cart_results=res;
      this.calculate_total();
      this.cart.results=this.cart.quantity_update(this.cart.results,res);
    });
  }
  setoldvalue(_item:any){
    this.quantity_old=_item;
  }
  addtoCart(item:any){
    const token = this.cart.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let url="http://localhost:8080/users/addToCart";
    let req={
      "bookId":item.bookId,
    }
    this.http.post(url,req,{ headers: headers }).subscribe((res)=>{
      item.quantity++;
      this.getItem();
    });
  }
  addItem(item: any){
    const token = this.cart.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let url="http://localhost:8080/users/updateCart";
    let req={
      "cartId":item.cartId,
      "bookId":item.bookId,
      "quantity":item.quantity+1,
      "price":item.price,
      "userId":item.userId
    }
    this.http.post(url,req,{ headers: headers }).subscribe((res:any)=>{
      if(res.statusCodeValue==200){
      item.quantity++;
      this.getItem();
      }else{
        this._snackBar.open(res.body, "cancel",{"duration": 5000});
      }
    });  
  }
  removeItem(item:any){
    if(item.quantity-1>0){
      const token = this.cart.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let url="http://localhost:8080/users/updateCart";
    let req={
      "cartId":item.cartId,
      "bookId":item.bookId,
      "quantity":item.quantity-1,
      "price":item.price,
      "userId":item.userId
    }
    this.http.post(url,req,{ headers: headers }).subscribe((res:any)=>{
      if(res.statusCodeValue==200){
      item.quantity--;
      this.getItem();
      }else{
        this._snackBar.open(res.body, "cancel",{"duration": 5000});
      }
    });
      
    }  else{
      const token = this.cart.token;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      let url="http://localhost:8080/users/deleteFromCart";
      let req={
        "bookId":item.bookId,
      }
      this.http.post(url,req,{ headers: headers }).subscribe((res)=>{
        item.quantity=0;
        this.getItem();
      });
  
    }
  }
  calculate_total(){
    this.total_amount=0;
    this.cart.total_items=0;
    this.cart.cart_results?.forEach((element: { quantity: number; price: number; }) => {
      if(element.quantity>0){
        this.total_amount += element.price*element.quantity;
        this.cart.total_items+=element.quantity;
      }
    })
  }
}
