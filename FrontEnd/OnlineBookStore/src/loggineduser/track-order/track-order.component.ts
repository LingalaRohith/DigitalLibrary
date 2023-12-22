import { Component, Input, ViewEncapsulation } from '@angular/core';
interface EventItem {
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
  desc:string;
}
@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss'],
  encapsulation:ViewEncapsulation.None
})

export class TrackOrderComponent {

  events: EventItem[];

  constructor() {
      this.events = [
          { status: 'Ordered', date: '07/08/2023 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', 
          image: 'assets/Mystery/The Last Thing He Told Me.png','desc':'We\'ve got it' },
          { status: 'Processing', date: '07/08/2023 14:00', icon: 'pi pi-cog', color: '#673AB7','desc':'Our team of superstars will process your order with cheetah-like speed, ensuring everything is carefully selected, packed, and ready to rock your world!' },
          { status: 'Shipped', date: '10/08/2023 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800','desc':'Exciting news! Your order is now on its way to you.' },
          { status: 'Delivered', date: '13/08/2023 10:00', icon: 'pi pi-check', color: '#607D8B' ,'desc':'Hooray! Your order has arrived! '}
      ];
  }
}
