import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent {
  
  quantity_old: any;
  thumbnail: any;
  total_amount: any;
  p: any = 1;
  count: any = 6;

  constructor(public cart: CartService,public dialog: MatDialog,public http:HttpClient,
    private sanitizer:DomSanitizer,private _snackBar: MatSnackBar) { }
  ngOnInit() {
    this.getallbooks();  
    if(this.cart.isUserloggedin){
      this.getItem();
    }
    
  }
  getallbooks(){
    let url="http://localhost:8080/users/getBooks"
    let req={
      "featuredBooks":false,
      "topBooks":false,
      "newBooks":false
    }
    this.http.post(url,req).subscribe((res:any)=>{ 
      this.cart.results=res.details;
      
    });
  }
  addtoCart(item: any) {
    if(this.cart.isUserloggedin){
      item.show_quantity = true;
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
    }else{
      this._snackBar.open("Please login inorder to add to cart", "cancel",{"duration": 5000});
    }
    
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
  calculate_total() {
    this.total_amount=0;
    this.cart.total_items=0;
    this.cart.cart_results?.forEach((element: { quantity: number; price: number; }) => {
      if(element.quantity>0){
        this.total_amount += element.price*element.quantity;
        this.cart.total_items+=element.quantity;
      }
    })
  }
  changeQuantity(item: any, _quantity: any) {
    
    // console.log(this.quantity);
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

    //this.cart.total_items++;
  }
  setoldvalue(_item: any) {
    this.quantity_old = _item;
  }
  addItem(item: any) {
    
    // this.quantity=item.quantity;
    this.cart.total_items++;
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
      this.getItem();
      }else{
        this._snackBar.open(res.body, "cancel",{"duration": 5000});
      }
    });
    
  }
  removeItem(item: any) {
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
        this.getItem();
        item.quantity--;
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
        this.getItem();
        item.quantity=0;
      });
  
    }

  }
  show_orig_products(){
    this.getallbooks();
  }
  bookDetails(item: any) {
    this.cart.selected_book = item;
    const dialogRef = this.dialog.open(BookDetailsComponent,{ disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    //this._router.navigate(['home/bookdetails']);
  }
  filter_results(Category: any) {
    this.getfiltered_books(Category);
    
  }
  getfiltered_books(category:any) {
    let url="http://localhost:8080/users/filterBook";
    let req={
      "bookName":"",
      "category_motivation":category.motivation,
      "category_drama":category.drama,
      "category_suspense":category.suspense,
      "category_fantasy":category.fantasy,
      "price":category.price,
      "author":"",
      "publisher":""

    }
    this.http.post(url,req).subscribe((res:any)=>{
      this.cart.results=res.details;
      
    })
  }

}
