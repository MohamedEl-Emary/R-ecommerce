import { environment } from './../../environments/environment';
import { Cart } from './../shared/Cart';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList : any = [];
  public productList = new BehaviorSubject<any>([]);
  public totalPrice = new BehaviorSubject<any>(0);
  public discountCode = new BehaviorSubject<any>("");
  constructor(private http:HttpClient) { }
  getProducts() {
    return this.productList.asObservable();
  }
  SetProduct(product:any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product:any){
    console.log(product)
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }
  getTotalPrice():number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal +=  a.quantity*(a.price-(a.price*(a.discount/100)));
    })
    return grandTotal;
  }
  setTotalPrice(price:number){
   this.totalPrice.next(price);
  }
getTotal(){
  return this.totalPrice.getValue();
}
setDiscount(code:string){
  this.discountCode.next(code);
}
getDiscount(){
  return this.discountCode.getValue();
}
  removeCartItem(product:any){
    this.cartItemList.map((a:any,index:any)=>{
      if(a.id == product.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
  checkOut(OrderModel:Cart){
    return this.http.post(environment.baseUrl+"User/CheckOut",OrderModel);
  }
}
