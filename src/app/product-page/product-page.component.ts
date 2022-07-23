import { BehaviorSubject } from 'rxjs';
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
  stars = [1, 2, 3, 4, 5];
  rating =0;
  hoverState = 0;
  editComment:any;
  commentEdit!:string
   enter(i: number) {
    this.hoverState = i;
  }

  leave(i: number) {
    this.hoverState = 0;
  }

  updateRating(i: number) {
console.log(i)
    this.api.rate({id:this.product.rateId ,productId:this.product.id,rate:i-1,userId:'',isRated:false}).
    subscribe(res=>{
      console.log(res);
     if(res !=-1){
      this.rating=i;
      this.product.rateId = res;
     }
    });
    console.log(this.rating);
  }

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
  console.log(res.isRated)
  if(res.isRated == true){
    this.rating=(res.rate+1)
  }
  this.apiService.getComments(this.productId).subscribe(res=>{

    this.comments = res;
   this.comments.forEach(e=>{
    e.commentDate = this.getCustomDate(new Date(e.commentDate));
   })
   console.log()
    console.log(this.comments);
  });
 });


}
getCustomDate(Date:Date){
 return Date.toLocaleDateString()+" "+Date.getMinutes()+":"+Date.getSeconds()
}
    postComment(){
      console.log('post')
      if(!this.comment.valid){
         console.log(this.comment.hasError)
      }else{
          let c = {id:0,userName:'',photoUrl:'',userId:this.profile.userId,productId:this.productId,comment:this.comment.value};
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
    edit(comment:any){
      this.editComment =comment;
      this.commentEdit = this.editComment.comment;
      console.log(this.editComment)
    }
    update(){
      console.log(this.commentEdit);

        console.log(this.editComment);
        this.api.updateComment(this.editComment.id,this.commentEdit).subscribe(e=>{
          if(e == true){
            this.comments.forEach(e=>{
              if(e.id == this.editComment.id){
                this.editComment.comment = this.commentEdit;
              }
            })
          }else{
            alert("Can't Update At This Time")
          }
        });
    }
    deleteComment(comment:any){
    this.api.deleteComment(comment.id).subscribe(e=>{
      if(e as unknown as boolean == true){
          for (let index = 0; index < this.comments.length; index++) {
          if(this.comments[index].id==comment.id){
            this.comments.splice(index,1);
          }

          }
      }else{
        alert("Can't Delete at This Time")
      }
    })
    }

}
