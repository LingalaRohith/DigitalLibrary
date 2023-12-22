import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-addpayment',
  templateUrl: './addpayment.component.html',
  styleUrls: ['./addpayment.component.scss']
})
export class AddpaymentComponent {
  @Output() submitClicked = new EventEmitter<any>();
  type = ["debit", "credit"];
  month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  year = ["2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"];

  PaymentGroup = new FormGroup({
    
    new_card_name: new FormControl("",[Validators.maxLength(15), Validators.pattern("^[a-zA-Z ]+$"),Validators.required]),
    new_card_type: new FormControl("",Validators.required),
    new_card_expirydate_month: new FormControl("",Validators.required),
    new_card_expirydate_year: new FormControl("",Validators.required),
    card_no: new FormControl("",[Validators.maxLength(16),Validators.minLength(15), Validators.pattern("^[0-9]+$"),Validators.required])
  });
  constructor(public cart:CartService,private http:HttpClient){

  }
  save_payment()
  {
    let url="http://localhost:8080/users/addPaymentCard"
   
    const token = this.cart.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let req={
      "cardType": this.PaymentGroup.controls.new_card_type.value,
      "cardHolder": this.PaymentGroup.controls.new_card_name.value,
      "cardNumber": this.PaymentGroup.controls.card_no.value,
      "expDate": this.PaymentGroup.controls.new_card_expirydate_month.value+"/"+this.PaymentGroup.controls.new_card_expirydate_year.value
    }
    let request=[]
    request.push(req);
    if(this.PaymentGroup.valid){
    this.http.post(url,request,{ headers: headers }).subscribe((res:any)=>{
      if(res.statusCode=="OK"){
        this.submitClicked.emit(true);
      }
    });
  }
  }
}
