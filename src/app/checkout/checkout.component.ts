import { Cart } from './../shared/Cart';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { BehaviorSubject } from 'rxjs';
import {render } from 'creditcardpayments/creditCardPayments'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
totalPrice = 0;
Cart!:Cart
  constructor(private cartService : CartService) {

  }

  ngOnInit(): void {
    this.totalPrice = this.cartService.getTotal();
    render({
      id: '#mypaypalButtons',
      value:  this.totalPrice.toString(),
      currency: 'US',
      onApprove:(state=>{
        console.log(state)
       this.payLocal("");
        alert("payment Successfully");
      })
    });
  }
payLocal(paytype:string){
 this.cartService.getProducts().subscribe(data=>{
 this.Cart = new Cart(data,this.totalPrice,this.cartService.getDiscount()
 ,paytype);
 this.cartService.checkOut(this.Cart).subscribe(res=>{
  if(res == true){
    this.cartService.cartItemList = [];
    this.cartService.productList = new BehaviorSubject<any>([]);
  }
  console.log(res);
 });
 console.log(this.Cart);
 });
}

}
