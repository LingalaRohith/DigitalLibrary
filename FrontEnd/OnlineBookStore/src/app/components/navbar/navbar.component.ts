import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  shownav: boolean=false;
  showFiller = false;
  showsearch: boolean=false;
  constructor(public cart:CartService,private _router: Router,private cookie:CookieService,private _snackBar: MatSnackBar){
   
  }
  ngOnInit(){
    this._router.events.subscribe((val:any) => {
      if(val && (val.url=='/login' || val.url=='/register')){
        this.showsearch=true;
      }else if(val.url && (val.url!='/login' || val.url!='/register')){
        this.showsearch=false;
      }
  });
  }
  clickMenu(){
    
    this.shownav=!this.shownav;
  }
  addtoCart(){
    this.cart.disable_checkout_btn=false;
    this._router.navigate(['home/manageCart']);
  }
  register(){
    this._router.navigate(['register']);
  }
  login(){
    this._router.navigate(['login']);
  }
  myAccount(){
    this._router.navigate(['home/editProfile'])
  }
  logout(){
    this.cart.isAdmin=false;
    this.cookie.delete('username','/');  
    this.cookie.delete('password','/');  
    localStorage.clear(); // Clear Local Storage
sessionStorage.clear(); // Clear Session Storage
this._snackBar.open("logout is Successful.", "cancel",{"duration": 5000});
    this._router.navigate(['home']);
  }
  Logout_user(){
    this.cookie.delete('username','/');  
    this.cookie.delete('password','/');  
    localStorage.clear(); // Clear Local Storage
sessionStorage.clear(); // Clear Session Storage
this._snackBar.open("logout is Successful.", "cancel",{"duration": 5000});
    this.cart.isUserloggedin=false;
    this.redirectTo('home');
  }
  
  redirectTo(uri: string) {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this._router.navigate([uri]));
 }
}
