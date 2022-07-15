import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { CartService } from '../service/cart.service';
import { FavListService } from '../service/fav-list.service';

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./fav-list.component.scss']
})
export class FavListComponent implements OnInit {
  public products:any=[];
  public productList : any;

  constructor(private favListService : FavListService, private cartService : CartService) { }

  ngOnInit(): void {
    this.favListService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.productList.forEach((a:any)=>{
        Object.assign(a,{quantity:1,total:a.price});
      });
    })
    
  }
  addtocart(item:any){
    this.cartService.addtoCart(item);

  }
  removeItem(item:any){
    this.favListService.removeFavItem(item);
  }

}
