import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent {
  
  items_prevorders: any;
  constructor(public cart:CartService,private _router: Router,private http:HttpClient,private _snackBar: MatSnackBar){}
  ngOnInit(){
    const token = this.cart.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let url="http://localhost:8080/users/getOrderHistory";
    
    this.http.get(url,{ headers: headers }).subscribe((res)=>{
      this.items_prevorders=res;
      
    });
  }
  Reorder(item:any){
    const token = this.cart.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let url="http://localhost:8080/users/reorderBook";
    let req={"orderId":item.orderId}
    
    this.http.post(url,req,{ headers: headers }).subscribe((res:any)=>{
      if(res.status){
        this._router.navigate(['home/manageCart']);
      }else{
        this._snackBar.open(res.message, "cancel",{"duration": 5000});
      }
      
    });
    

  }
  getCardColor(index: number): string {
    // Calculate the hue value based on the index
    const hue = (180 + index * 45) % 360;
    // Return the color as an HSL string
    return `hsl(${hue}, 70%, 90%)`;
  }  
}
