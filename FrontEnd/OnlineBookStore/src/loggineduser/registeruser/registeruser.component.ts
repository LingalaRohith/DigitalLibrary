import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegistrationconfirmationComponent } from '../registrationconfirmation/registrationconfirmation.component';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';
import { PasswordStrengthValidator } from '../Password_strong';
import { MatSnackBar } from '@angular/material/snack-bar';

interface State {
  value: string;
  viewValue: string;
}

interface card {
  value: string;
  viewValue: string;
}

interface month {
  value: string;
  viewValue: string;
}
interface year {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.scss']
})
export class RegisteruserComponent {
  signupUsers: any[] = [];
  signupObj = {
    userName: '',
    email: '',
    password: '',
    mobileNumber: '',
  };

  states: State[] = [
    { value: 'Alabama', viewValue: 'Alabama' },
    { value: 'Alaska', viewValue: 'Alaska' },
    { value: 'Arizona', viewValue: 'Arizona' },
    { value: 'Arkansas', viewValue: 'Arkansas' },
    { value: 'California', viewValue: 'California' },
    { value: 'Colorado', viewValue: 'Colorado' },
    { value: 'Connecticut', viewValue: 'Connecticut' },
    { value: 'Delaware', viewValue: 'Delaware' },
    { value: 'Florida', viewValue: 'Florida' },
    { value: 'Georgia', viewValue: 'Georgia' },
    { value: 'Hawaii', viewValue: 'Hawaii' },
    { value: 'Idaho', viewValue: 'Idaho' },
    { value: 'Illinois', viewValue: 'Illinois' },
    { value: 'Indiana', viewValue: 'Indiana' },
    { value: 'Iowa', viewValue: 'Iowa' },
    { value: 'Kansas', viewValue: 'Kansas' },
    { value: 'Kentucky', viewValue: 'Kentucky' },
    { value: 'Louisiana', viewValue: 'Louisiana' },
    { value: 'Maine', viewValue: 'Maine' },
    { value: 'Maryland', viewValue: 'Maryland' },
    { value: 'Massachusetts', viewValue: 'Massachusetts' },
    { value: 'Michigan', viewValue: 'Michigan' },
    { value: 'Minnesota', viewValue: 'Minnesota' },
    { value: 'Mississippi', viewValue: 'Mississippi' },
    { value: 'Missouri', viewValue: 'Missouri' },
    { value: 'Montana', viewValue: 'Montana' },
    { value: 'Nebraska', viewValue: 'Nebraska' },
    { value: 'Nevada', viewValue: 'Nevada' },
    { value: 'New Hampshire', viewValue: 'New Hampshire' },
    { value: 'New Jersey', viewValue: 'New Jersey' },
    { value: 'New Mexico', viewValue: 'New Mexico' },
    { value: 'New York', viewValue: 'New York' },
    { value: 'North Carolina', viewValue: 'North Carolina' },
    { value: 'North Dakota', viewValue: 'North Dakota' },
    { value: 'Ohio', viewValue: 'Ohio' },
    { value: 'Oklahoma', viewValue: 'Oklahoma' },
    { value: 'Oregon', viewValue: 'Oregon' },
    { value: 'Pennsylvania', viewValue: 'Pennsylvania' },
    { value: 'Rhode Island', viewValue: 'Rhode Island' },
    { value: 'South Carolina', viewValue: 'South Carolina' },
    { value: 'South Dakota', viewValue: 'South Dakota' },
    { value: 'Tennessee', viewValue: 'Tennessee' },
    { value: 'Texas', viewValue: 'Texas' },
    { value: 'Utah', viewValue: 'Utah' },
    { value: 'Vermont', viewValue: 'Vermont' },
    { value: 'Virginia', viewValue: 'Virginia' },
    { value: 'Washington', viewValue: 'Washington' },
    { value: 'West Virginia', viewValue: 'West Virginia' },
    { value: 'Wisconsin', viewValue: 'Wisconsin' },
    { value: 'Wyoming', viewValue: 'Wyoming' },
  ];


  cards: card[] = [
    { value: 'Debit', viewValue: 'Debit' },
    { value: 'Credit', viewValue: 'Credit' },
  ];

  months: month[] = [
    { value: '01', viewValue: '01' },
    { value: '02', viewValue: '02' },
    { value: '03', viewValue: '03' },
    { value: '04', viewValue: '04' },
    { value: '05', viewValue: '05' },
    { value: '06', viewValue: '06' },
    { value: '07', viewValue: '07' },
    { value: '08', viewValue: '08' },
    { value: '09', viewValue: '09' },
    { value: '10', viewValue: '10' },
    { value: '11', viewValue: '11' },
    { value: '12', viewValue: '12' },
  ];


  years: year[] = [    
    { value: '2023', viewValue: '2023' },
    { value: '2024', viewValue: '2024' },
    { value: '2025', viewValue: '2025' },
    { value: '2026', viewValue: '2026' },
    { value: '2027', viewValue: '2027' },
    { value: '2028', viewValue: '2028' },
    { value: '2029', viewValue: '2029' },
    { value: '2030', viewValue: '2030' },
    { value: '2031', viewValue: '2031' },
    { value: '2032', viewValue: '2032' },
    { value: '2033', viewValue: '2033' },
    { value: '2034', viewValue: '2034' },
    { value: '2035', viewValue: '2035' },
    { value: '2036', viewValue: '2036' },
    { value: '2037', viewValue: '2037' },
    { value: '2038', viewValue: '2038' },
    { value: '2039', viewValue: '2039' },
    { value: '2040', viewValue: '2040' },
  ];

  firstFormGroup = new FormGroup({
    firstNameCtrl: new FormControl('', [Validators.required,Validators.maxLength(15), Validators.pattern("^[a-z A-Z]+$")]),
    lastNameCtrl: new FormControl('', [Validators.required,Validators.maxLength(15), Validators.pattern("^[a-z A-Z]+$")]),
    emailCtrl: new FormControl('', [Validators.required,Validators.email]),
    passwordCtrl: new FormControl('', [Validators.required,PasswordStrengthValidator]),
    mobileCtrl: new FormControl('', [Validators.required,Validators.pattern("[0-9 ]{10}")]),
    subscribe_promo: new FormControl(false)
  });

  secondFormGroup = new FormGroup({
    streetCtrl: new FormControl('',[Validators.maxLength(35), ]),
    cityCtrl: new FormControl('',[Validators.maxLength(15), Validators.pattern("^[a-zA-Z ]+$")]),
    stateCtrl: new FormControl('',[Validators.maxLength(15), ]),
    zipCtrl: new FormControl('',[Validators.maxLength(5), Validators.pattern("^[0-9]+$")]),
  });

  thirdFormGroup = new FormGroup({
    CardCtrl: new FormControl(''),
    CardNbrCtrl: new FormControl('',[Validators.maxLength(16),Validators.minLength(15), Validators.pattern("^[0-9]+$")]),
    CardNameCtrl: new FormControl('',[Validators.maxLength(15), Validators.pattern("^[a-zA-Z ]+$")]),
    monthCtrl: new FormControl(''),
    yearCtrl: new FormControl(''),

  });

  hidePassword: boolean = true;

  isLinear = true;

  constructor(private _router: Router, public dialog: MatDialog,
     private http: HttpClient, private cart: CartService,private _snackBar: MatSnackBar
     ) { }
  ngOnInit(): void {

  }
  signup() {
    let url = "http://localhost:8080/users/register";
    let req = {
      "firstName": this.firstFormGroup.controls.firstNameCtrl.value,
      "lastName": this.firstFormGroup.controls.lastNameCtrl.value,
      "email": this.firstFormGroup.controls.emailCtrl.value,
      "password": this.firstFormGroup.controls.passwordCtrl.value,
      "mobileNumber": this.firstFormGroup.controls.mobileCtrl.value,
      "subscribeToPromo": this.firstFormGroup.controls.subscribe_promo.value,
      "paymentCards": [
        {
          "cardType": this.thirdFormGroup.controls.CardCtrl.value,
          "cardHolder": this.thirdFormGroup.controls.CardNameCtrl.value,
          "cardNumber": this.thirdFormGroup.controls.CardNbrCtrl.value,
          "expDate": this.thirdFormGroup.controls.monthCtrl.value + "/" + this.thirdFormGroup.controls.yearCtrl.value
        }
      ],
      "shippingAddress": [
        {
          "street": this.secondFormGroup.controls.streetCtrl.value,
          "city": this.secondFormGroup.controls.cityCtrl.value,
          "state": this.secondFormGroup.controls.stateCtrl.value,
          "zipCode": this.secondFormGroup.controls.zipCtrl.value
        }
      ]
    }
    if(this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid){
    this.http.post(url, req).subscribe((res: any) => {
      if (res.status) {
        this.cart.otp = res.otp;
        const dialogRef = this.dialog.open(RegistrationconfirmationComponent,{ disableClose: true });

        dialogRef.afterClosed().subscribe(result => {
          
          console.log(`Dialog result: ${result}`);
        });
      }

    else{
      this._snackBar.open(res.message, "cancel",{"duration": 5000});
    }
  },err=>{
      this._snackBar.open("Error in loading API"+err, "cancel",{"duration": 5000});
    });

  }
  else{
    this._snackBar.open("Please fill the correct data", "cancel",{"duration": 5000});
  }
}
}
