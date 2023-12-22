import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-resetpasswordconfirmation',
  templateUrl: './resetpasswordconfirmation.component.html',
  styleUrls: ['./resetpasswordconfirmation.component.scss']
})
export class ResetpasswordconfirmationComponent {
  submit: boolean=false;
  constructor(private cart:CartService,private http:HttpClient,private _snackBar: MatSnackBar){}
  @ViewChild(NgOtpInputComponent, { static: false })
  ngOtpInput!: NgOtpInputComponent;
  config :NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };
  OTPFormGroup = new FormGroup({
    otp: new FormControl('',[Validators.required]),
  });
  pswdFormGroup = new FormGroup({
    pswd: new FormControl('',[Validators.required]),
    cnfm_pswd: new FormControl('',[Validators.required]),
  });
  validate(){
    console.log(this.ngOtpInput.currentVal);
    if(this.ngOtpInput.currentVal.length==6){
      if(this.cart.otp+"" === this.ngOtpInput.currentVal){
        this.submit=true;
      }else{
        this._snackBar.open("Invalid OTP", "cancel",{"duration": 5000});
      }
    }
    
  }
  submit_pswd(){
    let url="http://localhost:8080/users/verifyForgotPasswordOTP";
    let req={
    "email":this.cart.email,
    "password":this.pswdFormGroup.controls.cnfm_pswd.value
    }
    this.http.post(url,req).subscribe((res:any)=>{
      this.cart.userId=res.id;
    });
  }
}
