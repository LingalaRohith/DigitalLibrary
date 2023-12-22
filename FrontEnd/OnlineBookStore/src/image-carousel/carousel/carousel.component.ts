import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from 'src/app/services/cart.service';

interface carouselImage{
  imageSrc:string;
  imageAlt:string;
}
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  @Input() images:carouselImage[]=[];
  @Input() indicators=true;
  @Input() controls=true;
  @Input() autoSlide=false;
  @Input() slideInterval=5000;// default to 5 seconds
  selectedIndex: number=0;
  thumbnail: any;
  constructor(public cart:CartService,private http:HttpClient,private sanitizer:DomSanitizer){

  }
ngOnInit(){
  if(this.autoSlide){
    this.autoSlideImages();
  }
}
//changes the slide in every 3 seconds
  autoSlideImages() {
    setInterval(()=>{
      this.onNextClick();
    },this.slideInterval);
  }
  image_click(i: any){
    let url="http://localhost:8080/users/getBooks";
    let req;
    if(i ==0){
      this.cart.isbestSeller.next(true);
      req=
        {
          "featuredBooks":false,
          "topBooks":true,
          "newBooks":false
      }
      
    }else if(i == 1){
      
      req=
        {
          "featuredBooks":false,
          "topBooks":false,
          "newBooks":true
      }
    }else if(i == 2){
      req=
        {
          "featuredBooks":true,
          "topBooks":false,
          "newBooks":false
      }
    }
    this.http.post(url,req).subscribe((res:any)=>{
      this.cart.results=res.details;
      this.cart.showBacktoResults=true;
    });
  }
//sets index of an image to a dot.
selectImage(index:number){
  this.selectedIndex=index;
  
}
onPrevClick(){
  if(this.selectedIndex ===0){
    this.selectedIndex = this.images.length-1;
  }else{
    this.selectedIndex--;
  }
}
onNextClick(){
  if(this.selectedIndex === this.images.length-1){
    this.selectedIndex=0;
  }else{
    this.selectedIndex++;
  }
}
}
