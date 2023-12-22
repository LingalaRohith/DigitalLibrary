import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { CartService } from 'src/app/services/cart.service';
import { HttpClient } from '@angular/common/http'; 
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-registrationconfirmation',
  templateUrl: './registrationconfirmation.component.html',
  styleUrls: ['./registrationconfirmation.component.scss']
})
export class RegistrationconfirmationComponent {
  show_otp: boolean=false;
  OTPFormGroup = new FormGroup({
    otp: new FormControl('',[Validators.required]),
  });
  config :NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };
  @ViewChild(NgOtpInputComponent, { static: false })
  ngOtpInput!: NgOtpInputComponent;
  constructor(private _router:Router,private cart:CartService, private http: HttpClient,private _snackBar: MatSnackBar){}
  ngOnInit(){
    this.show_otp=true;
  }
  login_redirect(){
    this._router.navigate(['login']);
  }
  validate(){
    console.log(this.ngOtpInput);
    if(this.ngOtpInput.currentVal.length==6){
      if(this.cart.otp+"" === this.ngOtpInput.currentVal){
        let url='http://localhost:8080/users/verifyUser';
        let val=this.ngOtpInput.currentVal;
        let req={ "otpCode": parseInt(val) };
        this.http.post(url, req).subscribe((res:any)=>{
          if (res.success) {
            // OTP is valid, hide the OTP input and take appropriate action
            this.show_otp = false;
          } else {
            // OTP is invalid, you may want to display an error message to the user
          }
        }
        );
            
        
        this.show_otp=false;
      }else{
        this._snackBar.open("Invalid OTP", "cancel",{"duration": 5000});
      }
    }
  }
  

}