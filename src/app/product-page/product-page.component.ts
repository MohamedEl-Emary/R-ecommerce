import { FavListService } from './../service/fav-list.service';
import { CartService } from './../service/cart.service';
import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  productId:any ='';
  comments!:Array<any>
   comment = new FormControl('',{validators:Validators.minLength(1)});
   product:any;
   token = localStorage.getItem("token");
   profile = localStorage.getItem("profile")==null?null:JSON.parse(localStorage.getItem("profile")!.toString());
  defaultImg = "../../assets/img/logo.png"
   constructor(private favListService:FavListService,private api:ApiService,private route:ActivatedRoute,private apiService:ApiService,private cartService:CartService) {

    this.comments = [];
    }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
console.log(this.profile)


this.apiService.getProductById(this.productId).subscribe(res=>{


  this.product = res;
  this.product.qty=1;
  this.product.total = res.price;
  console.log(res);
  this.apiService.getComments(this.productId).subscribe(res=>{

    this.comments = res;
    console.log(this.comments);
  });
 });



    }
    postComment(){
      console.log('post')
      if(!this.comment.valid){
         console.log(this.comment.hasError)
      }else{
          let c = {id:0,userName:'',photoUrl:'',userId:'',productId:this.productId,comment:this.comment.value};
          console.log(c);
        this.apiService.postComment(c).subscribe(e=>{
          if(e != -1){
            console.log(e);
            c.id = e as number;
            c.photoUrl = this.profile.photoUrl;
            c.userName = this.profile.name;
            this.comments.push(c)
          }
        });
      }

    }

    addtocart(item:any){
      this.cartService.addtoCart(item);

    }
    addToFavorite(product:any){

console.log(product)
this.favListService.addFavorite(product);



    }

}
