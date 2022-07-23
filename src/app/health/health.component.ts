import { AuthServiceService } from './../service/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { CartService } from '../service/cart.service';
import { FavListService } from '../service/fav-list.service';
@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})



export class HealthComponent implements OnInit {

  status:boolean = false;
  public productList : any;
  isAuthenticated=false;
  constructor(
    private api : ApiService,
    private cartService : CartService,
    private favListService : FavListService,
    private router:Router,
    private authService:AuthServiceService,
       ) { }
  async ngOnInit() {
     this.api.getProduct()
    .subscribe(async res=>{
      let r = res as any[];
      let result: any[] =[];
      r.forEach(e=>{
        if(e.category==0){
            result.push(e);
        }
      })
      this.productList = result;


           console.log(res);
      this.productList.forEach((a:any)=>{
        Object.assign(a,{qty:1,total:a.price});
      });
     if(await this.authService.isAuthenticated())
{
this.isAuthenticated = true;

      }
    })


  }
  addtocart(item:any){

    this.cartService.addtoCart(item);

  }
  addtocfav(item:any){
    this.favListService.addFavorite(item);
     console.log({productId:item.id})
  }
  public gotoProduct(url:any,id:any){
    this.router.navigate([url,id]);
  }
  changeIcon(){
    this.status = !this.status;

  }

}
