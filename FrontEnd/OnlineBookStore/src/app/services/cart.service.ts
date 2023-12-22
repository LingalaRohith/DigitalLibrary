import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  total_items=0;
  selected_book:any;
  total_books_cart: any[] = [];
  isAdmin:boolean=false;
  isbestSeller:Subject<boolean> = new Subject<boolean>();
  isfeaturedBook:Subject<boolean> = new Subject<boolean>();
  isnewBook:Subject<boolean> = new Subject<boolean>();
  editbook:any;
  showBacktoResults:boolean=false;
  results:any= [];
  cart_results:any=[];
  
  disable_checkout_btn:boolean=false;
  isUserloggedin:boolean=false;
  order_history=[
    {
      "date":"07/07/23",
      "items":[
        {
          'name': 'Wings of fire: An autobiography',
          'id':'9788173711466',
          'image': 'assets/Motivational and Spiritual/Wings of fire.png',
          'price': '15',
          'quantity': 0,
          'show_quantity': false,
          'category': 'Motivation',
          'Author': 'A. P. J. Abdul Kalam',
          'Details':'Reading books is a kind of enjoyment. Reading books is a good habit. We bring you a different kinds of books. You can carry this book where ever you want. It is easy to carry. It can be an ideal gift to yourself and to your loved ones. Care instruction keep away from fire.'
        },
        
    ]
    },
    {
      "date":"02/07/23",
      "items":[
        {
          'name': 'The Housemaid Secret: A totally gripping psychological thriller with a shocking twist ',
          'id':'1837901325',
          'image': 'assets/Mystery/The Housemaid\'s Secret.png',
          'price': '12',
          'quantity': 0,
          'show_quantity': false,
          'category': 'Suspense',
          'Author': 'Freida McFadden',
          'Details':'Prepare for a chilling and addictive psychological thriller as Freida McFadden delivers "The Housemaid," a gripping tale that has taken social media platforms by storm. Follow the protagonist as she navigates the twisted dynamics of the Winchester family, gradually unraveling dark secrets and dangerous obsessions. With a jaw-dropping twist that will leave you breathless, this suspenseful novel is a must-read for fans of Ruth Ware, Lisa Jewell, and Verity.'
        },
        {
        'name': 'Hunting Adeline (Cat and Mouse Duet) ',
          'id':'1957635010',
          'image': 'assets/Mystery/Hunting Adeline (Cat and Mouse Duet).png',
          'price': '15.97',
          'quantity': 0,
          'show_quantity': false,
          'category': 'Suspense',
          'Author': ' H. D. Carlton',
          'Details':'Experience the thrilling conclusion to the Cat and Mouse Duet with "The Diamond" and "The Hunter." As the characters navigate a treacherous world of deception and betrayal, they fight to reclaim their identities and seek justice. Prepare for intense action, relentless pursuit, and the unyielding wrath of those seeking revenge. Make sure to read "Haunting Adeline" first to fully immerse yourself in this gripping duet.'
        }
    ]
    }

  ];
  user_address=["AptNo-302,1 Main St, New York, NY","Apt No- 501, 1000 Lakeside Drive, Athens, GA"];
  card_details=[
    {
      'type':'debit',
      'expiry_date':'05/2028',
      'Name':'John',
      'card_no':'0587'
    },
    {
      'type':'credit',
      'expiry_date':'08/2027',
      'Name':'Mathew',
      'card_no':'1297'
    }
  ]
  token: any;
  otp: any;
  email: any;
  userId: any;
  category_opt!: { motivation: string; drama: string; suspense: string; fantasy: string; price: number | null; };
  constructor() { 
    this.isbestSeller.next(false);
    this.isfeaturedBook.next(false);
    this.isnewBook.next(false);
  }
  quantity_update(bookres:any,cartres:any){
    const array2Map = cartres.reduce((acc:any, item:any) => {
      acc[item.bookId] = item.quantity;
      
      return acc;
    }, {});
    const matchedArray = bookres.map((item:any) => ({
      ...item,
      quantity: array2Map[item.bookId]||0
    
    }));
    
    return matchedArray;
  }
}
