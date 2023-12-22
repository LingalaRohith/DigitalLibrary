import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { EditshippingaddrComponent } from '../editshippingaddr/editshippingaddr.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddshippingaddrComponent } from '../addshippingaddr/addshippingaddr.component';
import { EditpaymentComponent } from '../editpayment/editpayment.component';
import { AddpaymentComponent } from '../addpayment/addpayment.component';
import { PasswordStrengthValidator } from '../Password_strong';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent {
  type = ["debit", "credit"];
  month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  year = ["2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"];
  firstFormGroup = this._formBuilder.group({
    firstName:['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
    lastName:['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
    mobileNo:['', [Validators.required,Validators.pattern("[0-9 ]{10}")]],
    subscription:[]
    
  });
  passwordFormGroup = this._formBuilder.group({
    password:['', [Validators.required,PasswordStrengthValidator]],
    confirmPassword:['',[Validators.required,PasswordStrengthValidator]]
  });
  
  
  
  isLinear = true;
  
  show_personal_details: boolean = false;
  show_change_pswd: boolean=false;
  show_shipping: boolean=false;
  show_payment: boolean=false;
  
  shipping_details: any;
  payment_details: any;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  edit_profile_details: any;
  constructor(private _formBuilder: FormBuilder,private _router: Router,
    public cart:CartService,public http:HttpClient,private dialog:MatDialog,private _snackBar: MatSnackBar) {}
  ngOnInit(){
    this.get_callapi();
    this.show_personal_details=true;
      }
  get_callapi(){
    let url="http://localhost:8080/users/"+this.cart.userId;
    const token = this.cart.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.get(url,{ headers: headers }).subscribe((res:any)=>{
      this.edit_profile_details=res;
      this.shipping_details=res.shippingAddress;
      this.payment_details=res.paymentCards;
      // this.firstFormGroup.controls.userName.setValue(res.username);
      this.firstFormGroup.controls.subscription.setValue(res.subscribeToPromo);
      this.firstFormGroup.controls.firstName.setValue(res.firstName);
      this.firstFormGroup.controls.lastName.setValue(res.lastName);
      this.firstFormGroup.controls.mobileNo.setValue(res.mobileNumber);
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
  save_callapi(){
    const token = this.cart.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let url="http://localhost:8080/users/editProfile";
    let req={
      "firstName": this.firstFormGroup.controls.firstName.value,
      "lastName": this.firstFormGroup.controls.lastName.value,  
      "email": this.edit_profile_details.email,
      "password": this.passwordFormGroup.controls.confirmPassword.value == ''?this.edit_profile_details.password:this.passwordFormGroup.controls.confirmPassword.value,
      "mobileNumber": this.firstFormGroup.controls.mobileNo.value,
      "subscribeToPromo":this.firstFormGroup.controls.subscription.value
    }
    if(this.firstFormGroup.valid){
      this.http.put(url,req,{ headers: headers }).subscribe((res:any)=>{
        if(res.status){
          this.get_callapi();
          this._snackBar.open(res.message, "cancel",{"duration": 5000});
        }
      });
    }
    
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
  
  click_personal(){
    this.show_personal_details=true;
    this.show_change_pswd=false;
    this.show_shipping=false;
    this.show_payment=false;
    this.get_callapi();
  }
  click_change_pswd(){
    this.show_change_pswd=true;
    this.show_personal_details=false;
    this.show_shipping=false;
    this.show_payment=false;
  }
  click_shipping(){
       this.show_shipping=true;
    this.show_personal_details=false;
    this.show_change_pswd=false;
    this.show_payment=false;
  }
  click_payment(){
        this.show_payment=true;
    this.show_change_pswd=false;
    this.show_personal_details=false;
    this.show_shipping=false;
  }
  save(){
    this.save_callapi();
    this.cart.isUserloggedin=true;
    this._router.navigate(['home']);
  }
  

}
