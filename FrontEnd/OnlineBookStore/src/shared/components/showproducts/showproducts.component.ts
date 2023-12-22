import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductlistComponent } from '../productlist/productlist.component';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.scss']
})
export class ShowproductsComponent {
  disabled = false;
  max = 50;
  min = 0;
  showTicks = true;
  step = 2;
  thumbLabel = true;

  @ViewChild(ProductlistComponent) prod_list:ProductlistComponent | undefined;
  changed_price!: boolean;
  constructor(public cart:CartService){

  }
  ngonInit(){
    console.log(this.Category_Filter.controls.price_filter.value);
  }
  
  Category_Filter = new FormGroup({
    motivaton_category: new FormControl(false),
    drama_category: new FormControl(''),
    suspense_category: new FormControl(''),
    fantasy_category: new FormControl(''),
    price_filter:new FormControl(0)
  });
  showOptions(){
    
      let category={
        'motivation':(this.Category_Filter.controls.motivaton_category.value)?"true":"false",
        'drama':(this.Category_Filter.controls.drama_category.value)?"true":"false",
        'suspense':(this.Category_Filter.controls.suspense_category.value)?"true":"false",
        'fantasy':(this.Category_Filter.controls.fantasy_category.value)?"true":"false",
        'price':(this.Category_Filter.controls.price_filter.value)
      }
      this.cart.category_opt=category;
      this.prod_list?.filter_results(category);
      this.cart.showBacktoResults=true;
    
  }
  setAll(event:any){
    let category={
      'motivation':(this.Category_Filter.controls.motivaton_category.value)?"true":"false",
      'drama':(this.Category_Filter.controls.drama_category.value)?"true":"false",
      'suspense':(this.Category_Filter.controls.suspense_category.value)?"true":"false",
      'fantasy':(this.Category_Filter.controls.fantasy_category.value)?"true":"false",
      'price':(this.Category_Filter.controls.price_filter.value)
    }
    this.cart.category_opt=category;
  }
  back_results(){
    this.cart.showBacktoResults=false;
    this.prod_list?.getallbooks();
  }
  onFilter(){
    this.showOptions();
  }
}
