import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editshippingaddr',
  templateUrl: './editshippingaddr.component.html',
  styleUrls: ['./editshippingaddr.component.scss']
})
export class EditshippingaddrComponent {
  input_data: any;
  @Output() submitClicked = new EventEmitter<any>();
  constructor(private _formBuilder: FormBuilder){}
  secondFormGroup = this._formBuilder.group({
    street: ['', [Validators.maxLength(35), Validators.pattern("^[a-zA-Z ]+$"),Validators.required]],
    city: ['', [Validators.maxLength(15), Validators.pattern("^[a-zA-Z ]+$"),Validators.required]],
    state: ['', [Validators.maxLength(15), Validators.pattern("^[a-zA-Z ]+$"),Validators.required]],
    zipCode: ['', [Validators.maxLength(5), Validators.pattern("^[0-9]+$"),Validators.required]],
  });
  ngOnInit(){
    this.secondFormGroup.controls.street.setValue(this.input_data.street);
    this.secondFormGroup.controls.city.setValue(this.input_data.city);
    this.secondFormGroup.controls.state.setValue(this.input_data.state);
    this.secondFormGroup.controls.zipCode.setValue(this.input_data.zipCode);
  }
  save_address(){
    let data={
      "street":this.secondFormGroup.controls.street.value,
      "city":this.secondFormGroup.controls.city.value,
      "state":this.secondFormGroup.controls.state.value,
      "zipCode":this.secondFormGroup.controls.zipCode.value
    }
    this.submitClicked.emit(data);
  }
}
