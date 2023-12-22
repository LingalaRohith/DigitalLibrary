import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editpayment',
  templateUrl: './editpayment.component.html',
  styleUrls: ['./editpayment.component.scss']
})
export class EditpaymentComponent {
  @Output() submitClicked = new EventEmitter<any>();
  input_data: any;
  constructor(private _formBuilder: FormBuilder){}
  type = ["debit", "credit"];
  month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  year = ["2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"];
  thirdFormGroup = this._formBuilder.group({
    cardType: ['', Validators.required],
    cardNo: ['', [Validators.maxLength(16),Validators.minLength(15), Validators.pattern("^[0-9]+$"),Validators.required]],
    NameonCard: ['', [Validators.maxLength(15), Validators.pattern("^[a-zA-Z ]+$"),Validators.required]],
    exp_Month: ['', Validators.required],
    exp_Year: ['', Validators.required],
  });
  ngOnInit(){
    this.thirdFormGroup.controls.cardType.setValue(this.input_data.cardType);
    this.thirdFormGroup.controls.cardNo.setValue(this.input_data.cardNumber);
    this.thirdFormGroup.controls.NameonCard.setValue(this.input_data.cardHolder);
    let toArray =  this.input_data.expDate.split("/");
    this.thirdFormGroup.controls.exp_Month.setValue(toArray[0]);
    this.thirdFormGroup.controls.exp_Year.setValue(toArray[1]);
  }
  edit_payment(){
    let data={
      "cardHolder":this.thirdFormGroup.controls.NameonCard.value,
      "cardType":this.thirdFormGroup.controls.cardType.value,
      "expDate":this.thirdFormGroup.controls.exp_Month.value+"/"+this.thirdFormGroup.controls.exp_Year.value,
      "cardNumber":this.thirdFormGroup.controls.cardNo.value
    }
    if(this.thirdFormGroup.valid){
      this.submitClicked.emit(data);
    }
    
  }
}
