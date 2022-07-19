import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { CartService } from '../service/cart.service';
import { FavListService } from '../service/fav-list.service';

@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.scss']
})
export class ElectronicsComponent implements OnInit {

  status:boolean = false;
  public productList : any;
  constructor(
    private api : ApiService,
    private cartService : CartService,
    private favListService : FavListService,
    private router:Router
      ) { }
  ngOnInit(): void {
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
           console.log(res);
      this.productList.forEach((a:any)=>{
        Object.assign(a,{quantity:1,total:a.price});
      });
    })


  }
  addtocart(item:any){
    this.cartService.addtoCart(item);

  }
  addtocfav(item:any){
    this.favListService.addtoFav(item);

  }
  public gotoProduct(url:any,id:any){
    this.router.navigate([url,id]);
  }
  changeIcon(){
    this.status = !this.status;

  }

}
