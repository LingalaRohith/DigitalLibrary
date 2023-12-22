import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { EditbookComponent } from '../editbook/editbook.component';
import { AddbookComponent } from '../addbook/addbook.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface UserData {
  bookId: string;
  title: string;
  image_data: string;
  selling_Price: string;
  actions:string
}


@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss']
})
export class AdminhomeComponent {
  displayedColumns: string[] = ['bookId', 'title', 'image_data', 'selling_Price','actions'];
  
  dataSource: MatTableDataSource<UserData>;

  private paginator!: MatPaginator;
  private sort!: MatSort;
  thumbnail: any;
  managebooks:boolean=false;
  managepromotions: boolean=false;
  AddPromoForm = new FormGroup({
    promoCode: new FormControl('',[Validators.required,Validators.pattern("^[a-z A-Z0-9]+$")]),
    startDate: new FormControl(),
    expiryDate: new FormControl(),
    percentage:new FormControl('',[Validators.required,Validators.pattern("^[ 0-9]+$")]),
  });
  minDate: Date;
  constructor(public cart:CartService,public dialog: MatDialog,public http:HttpClient,
    public sanitizer:DomSanitizer,private _snackBar: MatSnackBar,public datepipe: DatePipe) {
    this.minDate = new Date();
    // Assign the data to the data source for the table to render
    this.getallbooks();
    this.dataSource = new MatTableDataSource(this.cart.results);
  }
  ngOnInit(){
    this.managebooks=true;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  edit(_row:any){
    this.cart.editbook=_row;
    const dialogRef = this.dialog.open(EditbookComponent,{ disableClose: true });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getallbooks();
    
    });
  }
  getallbooks(){
    let url="http://localhost:8080/users/getBooks";
    let req={
      "featuredBooks":false,
      "topBooks":false,
      "newBooks":false
    }
    this.http.post(url,req).subscribe((res:any)=>{
      
      this.cart.results=res.details;
      this.dataSource = new MatTableDataSource(this.cart.results);
      
    });
    

  }
  
  addbook(){
    const dialogRef = this.dialog.open(AddbookComponent,{ disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
  manage_books(){
    this.managebooks=true;
    this.managepromotions=false;
  }
  empty(){
    this.managebooks=false;
  }
  manage_promotions(){
    this.managepromotions=true;
    this.managebooks=false;
  }
  addpromo(){
    if(this.AddPromoForm.valid){
    const token = this.cart.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    let url="http://localhost:8080/admin/addPromo";
    
    let req={
      "promoCode": this.AddPromoForm.controls.promoCode.value,
      "startDate": this.formatDateToYYYYMMDD(this.AddPromoForm.controls.startDate.value),
      "expiryDate": this.formatDateToYYYYMMDD(this.AddPromoForm.controls.expiryDate.value),
      "percentage": this.AddPromoForm.controls.percentage.value
  }
    this.http.post(url,req,{ headers: headers }).subscribe((res:any)=>{
      if(res.status){
      this._snackBar.open(res.message, "cancel",{"duration": 5000});
      this.AddPromoForm.reset();
    }
    });
  }
  }
  formatDateToYYYYMMDD(date: Date) {
    if(date!=null){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return year+"-"+month+"-"+day;
  }else{
    return null;
  }
  }
}