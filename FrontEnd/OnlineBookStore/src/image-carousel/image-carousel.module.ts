import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    CarouselComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports:[
    CarouselComponent
  ]
})
export class ImageCarouselModule { }
