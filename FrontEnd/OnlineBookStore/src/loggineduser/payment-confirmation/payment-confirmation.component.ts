import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.scss']
})
export class PaymentConfirmationComponent {
  cvvFormGroup = new FormGroup({
    cvvCode: new FormControl('',[Validators.required,Validators.pattern("[0-9 ]{3}")]),
    });
  show_confirmation: boolean=false;
  constructor(private _router: Router,public cart:CartService){

  }
  redirect_home(){
    this.cart.total_items=0;
    this._router.navigate(['home']);
  }
  confirm_cvv(){
    this.show_confirmation=true;
  }
}
