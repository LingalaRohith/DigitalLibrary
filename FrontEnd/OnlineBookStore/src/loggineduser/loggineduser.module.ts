import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedinuserComponent } from './login/loggedinuser/loggedinuser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ManagecartComponent } from './managecart/managecart.component';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { PaymentConfirmationComponent } from './payment-confirmation/payment-confirmation.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { RegistrationconfirmationComponent } from './registrationconfirmation/registrationconfirmation.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgOtpInputModule } from 'ng-otp-input';
import { ResetpasswordconfirmationComponent } from './resetpasswordconfirmation/resetpasswordconfirmation.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { EditshippingaddrComponent } from './editshippingaddr/editshippingaddr.component';
import { AddshippingaddrComponent } from './addshippingaddr/addshippingaddr.component';
import { EditpaymentComponent } from './editpayment/editpayment.component';
import { AddpaymentComponent } from './addpayment/addpayment.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    LoggedinuserComponent,
    CheckoutComponent,
    ManagecartComponent,
    PaymentConfirmationComponent,
    OrderHistoryComponent,
    TrackOrderComponent,
    RegisteruserComponent,
    EditprofileComponent,
    RegistrationconfirmationComponent,
    ResetpasswordconfirmationComponent,
    EditshippingaddrComponent,
    AddshippingaddrComponent,
    EditpaymentComponent,
    AddpaymentComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    RouterModule,
    MatToolbarModule,
    TimelineModule,
    CardModule,
    ButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatCheckboxModule,
    NgOtpInputModule,
    MatSnackBarModule,
    HttpClientModule,
  ],
  exports:[
    LoggedinuserComponent,
    CheckoutComponent,
    ManagecartComponent,
    PaymentConfirmationComponent,
    OrderHistoryComponent,
    TrackOrderComponent,
    RegisteruserComponent,
    EditprofileComponent,
    RegistrationconfirmationComponent
  ]
})
export class LoggineduserModule { }