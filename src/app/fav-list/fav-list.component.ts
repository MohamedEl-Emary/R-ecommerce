import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
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
    this.favListService.getFavorite()
    .subscribe(res=>{
      this.products = res;
      console.log(res);
      this.productList.forEach((a:any)=>{
        Object.assign(a,{qty:1,total:a.price});
      });
    })

  }
  addtocart(item:any){
    this.cartService.addtoCart(item);

  }
  removeItem(item:any){

  for (let index = 0; index <  this.products.length; index++) {
     if(this.products[index].productId==item.id){
      console.log(this.products[index].productId);
      this.favListService.removeFromFavorite(this.products[index].id).subscribe(e=>{
          if(e == true){
            this.products.splice(index,1);
          }else{
            alert("Can't Remove")
          }

   });
      break;
    }
  }
  }

}
