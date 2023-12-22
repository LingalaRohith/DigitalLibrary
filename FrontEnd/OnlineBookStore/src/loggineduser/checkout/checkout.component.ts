import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart.service';
import { PaymentConfirmationComponent } from '../payment-confirmation/payment-confirmation.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddshippingaddrComponent } from '../addshippingaddr/addshippingaddr.component';
import { EditshippingaddrComponent } from '../editshippingaddr/editshippingaddr.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddpaymentComponent } from '../addpayment/addpayment.component';
import { EditpaymentComponent } from '../editpayment/editpayment.component';
import { ManagecartComponent } from '../managecart/managecart.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  enable_new_address: boolean = false;
  enable_new_payment: boolean = false;
  payment: any;
  type = ["debit", "credit"];
  month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  year = ["2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"];
  shipping_details: any;
  payment_details: any;
  @ViewChild(ManagecartComponent)
  managecart!: ManagecartComponent;
  updatedtotal: number=0.0;
  showupdatedTotal: boolean=false;
  constructor(public cart: CartService, public dialog: MatDialog,private http:HttpClient,private _snackBar: MatSnackBar) { }
  promotionFormGroup = new FormGroup({
    promotionCode: new FormControl(''),
    });
  AddressGroup = new FormGroup({
    addr: new FormControl('', Validators.required),
    
  });
  PaymentGroup = new FormGroup({
    confirm_card: new FormControl('', Validators.required),
   
  });
  isLinear = true;
  ngOnInit(){
    this.get_callapi();
  }
  get_callapi(){
    let url="http://localhost:8080/users/"+this.cart.userId;
    const token = this.cart.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.get(url,{ headers: headers }).subscribe((res:any)=>{
      
      this.shipping_details=res.shippingAddress;
      this.payment_details=res.paymentCards;
      
      
    });

  }
  new_payment() {
    if(this.payment_details.length<3){
      const dialogRef = this.dialog.open(AddpaymentComponent,{ disableClose: true });
    
    
      dialogRef.componentInstance.submitClicked.subscribe((result: any) => {
         if(result){
           this.get_callapi();
         }
           });
           dialogRef.afterClosed().subscribe(result => {
             
             console.log(`Dialog result: ${result}`);
           });
      
    }else{
      this._snackBar.open("Sorry, we cannot add more than 3 cards", "cancel",{"duration": 5000});
       
   
    }
   
  }
  new_address() {
    const dialogRef = this.dialog.open(AddshippingaddrComponent,{ disableClose: true });
   dialogRef.componentInstance.submitClicked.subscribe(result => {
      if(result){
        this.get_callapi();
      }
        });
        dialogRef.afterClosed().subscribe(result => {
          
          console.log(`Dialog result: ${result}`);
        });
    
  }
  edit_address(addr:any,index:any){
    const dialogRef = this.dialog.open(EditshippingaddrComponent,{ disableClose: true });
    let instance = dialogRef.componentInstance;
    instance.input_data=addr;
   dialogRef.componentInstance.submitClicked.subscribe(result => {
      this.shipping_details[index]=result;
      this.save_calladdr(addr);
  });
        dialogRef.afterClosed().subscribe(result => {
          
          console.log(`Dialog result: ${result}`);
        });
    
  }
  save_calladdr(addr:any){
    const token = this.cart.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let url="http://localhost:8080/users/editShippingAddress";
    let req={

      "addressId":addr.addressId,
      "street":addr.street,
      "city":addr.city,  
      "state":addr.state,
      "zipCode":addr.zipCode
  
  }
  this.http.put(url,req,{ headers: headers }).subscribe((res:any)=>{
    if(res.status){
      this.get_callapi();
      this._snackBar.open(res.message, "cancel",{"duration": 5000});
    }
  });
  }
  delete_address(addr:any){
    const token = this.cart.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let url="http://localhost:8080/users/deleteShippingAddress";
    let req={
      "addressId":addr.addressId,
    }
    this.http.post(url,req,{ headers: headers }).subscribe((res:any)=>{
      this.get_callapi();
      this._snackBar.open(res.message, "cancel",{"duration": 5000});
    });
  }
  
  edit_payment(card:any,i:any){
    const dialogRef = this.dialog.open(EditpaymentComponent,{ disableClose: true });
    let instance = dialogRef.componentInstance;
    instance.input_data=card;
   dialogRef.componentInstance.submitClicked.subscribe(result => {
      this.shipping_details[i]=result;
      this.save_call_payment(card);
  });
        dialogRef.afterClosed().subscribe(result => {
          
          console.log(`Dialog result: ${result}`);
        });
    
  }
  delete_card(card:any){
    const token = this.cart.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let url="http://localhost:8080/users/deleteCards";
    let req={
      "paymentId": card.paymentId,
    }
    this.http.post(url,req,{ headers: headers }).subscribe((res)=>{
      this.get_callapi();
      this._snackBar.open("Card Deleted Successfully", "cancel",{"duration": 5000});
    });
  }
  save_call_payment(card:any){
    const token = this.cart.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let url="http://localhost:8080/users/editProfile";
    let req={
      "paymentId": card.paymentId,
      "cardNumber":card.cardNumber,
      "cardHolder":card.cardHolder,
      "cardType":card.cardType,
      "expDate":card.expDate,
      "userId":card.userId
  }
  this.http.put(url,req,{ headers: headers }).subscribe((res:any)=>{
    if(res.status){
      this.get_callapi();
      this._snackBar.open(res.message, "cancel",{"duration": 5000});
    }
  });

  }

  
  confirm() {
    if(this.AddressGroup.valid && this.PaymentGroup.valid){
    const token = this.cart.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let url="http://localhost:8080/users/checkOut";
    let req={
      "paymentCardId": this.PaymentGroup.controls.confirm_card.value,
      "shippingAddressId":this.AddressGroup.controls.addr.value,
      "userId":this.cart.userId,
     // "promoCode":this.promotionFormGroup.controls.promotionCode.value?this.promotionFormGroup.controls.promotionCode.value:''
  }
  this.http.post(url,req,{ headers: headers }).subscribe((res:any)=>{
    const dialogRef = this.dialog.open(PaymentConfirmationComponent,{ disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  });
    
  }
  }
  // apply_promotion(){
  //   const token = this.cart.token;
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });
  //   let url="http://localhost:8080/users/verifyPromo";
  //   let req={
  //     "promoCode":this.promotionFormGroup.controls.promotionCode.value
  //   }
  // this.http.post(url,req,{ headers: headers }).subscribe((res:any)=>{
  //     if(res.status){
  //       this.showupdatedTotal=true;
  //       let discount=(this.managecart.total_amount*res.percentage)/100;
  //       this.updatedtotal=this.managecart.total_amount-discount;
  //       this.updatedtotal = parseFloat(this.updatedtotal.toFixed(2));
  //     }else{
  //       this._snackBar.open(res.message, "cancel",{"duration": 5000});
  //     }
  // });
  // }
}

