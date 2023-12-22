import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/services/cart.service';
import { PasswordStrengthValidator } from 'src/loggineduser/Password_strong';
import { ResetpasswordconfirmationComponent } from 'src/loggineduser/resetpasswordconfirmation/resetpasswordconfirmation.component';

@Component({
  selector: 'app-loggedinuser',
  templateUrl: './loggedinuser.component.html',
  styleUrls: ['./loggedinuser.component.scss'],
})
export class LoggedinuserComponent implements OnInit {

  hidePassword: boolean = true;


  loginFormGroup = new FormGroup({
    UsernameCtrl: new FormControl('', [Validators.required,Validators.email]),
    PasswordCtrl: new FormControl('', [Validators.required,PasswordStrengthValidator]),
    remember:new FormControl(false)
    });
  forgotPasswordGroup=new FormGroup({
    email:new FormControl('', [Validators.required,Validators.email]),
  });
  isforgotpassword: boolean=false;

  constructor(public cart:CartService,private _router: Router,public http:HttpClient
    ,private cookieService: CookieService,public dialog: MatDialog,private _snackBar: MatSnackBar) {}
  ngOnInit(): void {
    if(this.cookieService.get('username') && this.cookieService.get('password')){
      this.loginFormGroup.controls.UsernameCtrl.setValue(this.cookieService.get('username'));
      this.loginFormGroup.controls.PasswordCtrl.setValue(this.cookieService.get('password'));
    }else{
      this.loginFormGroup.controls.UsernameCtrl.setValue("");
      this.loginFormGroup.controls.PasswordCtrl.setValue("");
    }
  }
  login(){
    if(this.loginFormGroup.valid){
      if(this.loginFormGroup.controls.remember.value){
        const usernameControl = this.loginFormGroup.controls.UsernameCtrl;
        let username:string=usernameControl.value !== null ? usernameControl.value:'';
        const passwordControl = this.loginFormGroup.controls.PasswordCtrl;
const pswd = passwordControl.value !== null ? passwordControl.value : '';
const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 7); // Expiration date set to 7 days from now
        this.cookieService.set("username", username,expirationDate); // Expires after 30 days
        this.cookieService.set("password", pswd, expirationDate); // Expires after 30 days
      }
      let url ="http://localhost:8080/users/signin";
      let req={
        "userName": this.loginFormGroup.controls.UsernameCtrl.value,
        "password": this.loginFormGroup.controls.PasswordCtrl.value
      }
      this.http.post(url,req).subscribe((res:any)=>{
        this.cart.token=res.token;
        
        if(res.roles=="Customer"){
          this.cart.isUserloggedin=true;
          this.cart.userId=res.id;
          this._router.navigate(['home']);
        }
        else if(res.roles == "Admin"){
          this.cart.isAdmin=true;
          this._router.navigate(['admin/home']);
        }
        else{
          this._snackBar.open(res.message, "cancel",{"duration": 5000});
        }
        
      },err=>{
        if(err.status==401){
          this._snackBar.open("Invalid Credentials. Please try again.", "cancel",{"duration": 5000});  
        }else{
          this._snackBar.open("Error in loading API"+err, "cancel",{"duration": 5000});
        }
      });
      
    }
    
  }
  forgot_password(){
    this.isforgotpassword=true;
  }
  Submit_email(){
    let url="http://localhost:8080/users/forgotPassword";
    let req={
      "email":this.forgotPasswordGroup.controls.email.value
  }
    this.http.post(url,req).subscribe((res:any)=>{
      if(res.status){
        this.cart.otp=res.otp;
        this.cart.email=this.forgotPasswordGroup.controls.email.value;
        const dialogRef = this.dialog.open(ResetpasswordconfirmationComponent,{ disableClose: true });

        dialogRef.afterClosed().subscribe((result: any) => {
          this._router.navigate(['home']);
        });
      }else{
        this._snackBar.open(res.message, "cancel",{"duration": 5000});
      }
    },err=>{
      if(err.status==401){
        this._snackBar.open("Invalid Credentials. Please try again.", "cancel",{"duration": 5000});  
      }else{
        this._snackBar.open("Error in loading API"+err, "cancel",{"duration": 5000});
      }
      
    });
  }
}

