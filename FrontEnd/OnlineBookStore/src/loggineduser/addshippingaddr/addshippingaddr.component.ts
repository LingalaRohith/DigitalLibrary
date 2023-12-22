import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-addshippingaddr',
  templateUrl: './addshippingaddr.component.html',
  styleUrls: ['./addshippingaddr.component.scss']
})
export class AddshippingaddrComponent {
  @Output() submitClicked = new EventEmitter<any>();
  AddressGroup = new FormGroup({
    
    new_street: new FormControl('',[Validators.maxLength(35), Validators.pattern("^[a-zA-Z ]+$"),Validators.required]),
    new_city:new FormControl('',[Validators.maxLength(15), Validators.pattern("^[a-zA-Z ]+$"),Validators.required]),
    new_state:new FormControl('',[Validators.maxLength(15), Validators.pattern("^[a-zA-Z ]+$"),Validators.required]),
    new_zipcode:new FormControl('',[Validators.maxLength(5), Validators.pattern("^[0-9]+$"),Validators.required])
  });
  constructor(public cart:CartService,private http:HttpClient){

  }
  save_addr() {
    
   
    let url="http://localhost:8080/users/addShippingAddress"
   
    const token = this.cart.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let req={
      "street":this.AddressGroup.controls.new_street.value,
      "city":this.AddressGroup.controls.new_city.value,
      "state":this.AddressGroup.controls.new_state.value,
      "zipCode":this.AddressGroup.controls.new_zipcode.value
    }
    let request=[]
    request.push(req);
    this.http.post(url,request,{ headers: headers }).subscribe((res:any)=>{
      if(res.statusCode=="OK"){
        this.submitClicked.emit(true);
      }
    });
  }
}
