import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddbookComponent } from './components/addbook/addbook.component';
import { EditbookComponent } from './components/editbook/editbook.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
@NgModule({
  declarations: [
    AdminloginComponent,
    AdminhomeComponent,
    AddbookComponent,
    EditbookComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],exports:[
    AdminloginComponent,
    AdminhomeComponent,
    AddbookComponent,
    EditbookComponent
  ],providers:[DatePipe]
})
export class AdminModule { }
