import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbooksComponent } from './components/searchbooks/searchbooks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ShowproductsComponent } from './components/showproducts/showproducts.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';

import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    SearchbooksComponent,
    ShowproductsComponent,
    ProductlistComponent,
    BookDetailsComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    MatSliderModule,
    NgxPaginationModule,
    MatCardModule, 
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    HttpClientModule
    
  ],exports:[
    SearchbooksComponent,
    ShowproductsComponent,
    ProductlistComponent,
    BookDetailsComponent,
    
  ]
})
export class SharedModule { }
