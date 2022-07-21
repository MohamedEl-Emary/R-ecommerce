import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CartService } from '../service/cart.service';
import { validateCode } from './custom.validators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit ,AfterViewInit{
  public products:any=[];
  public grandTotal:number=0;
  constructor(private cartService : CartService) { }
  qty = new FormControl(1,{
validators:Validators.min(1)
  },)
  code=new FormControl(null,{
    validators:Validators.min(1),
    updateOn:'blur'
    },)
    ngAfterViewInit(): void {
      this.code.setAsyncValidators(validateCode());

   }
  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      console.log(res);
      this.products = res;
      console.log(res);
      this.grandTotal = this.cartService.getTotalPrice();
      this.cartService.setTotalPrice(this.grandTotal);
    })
  }
  removeItem(item:any){
    this.cartService.removeCartItem(item);
  }
  emptyCart(){
    this.cartService.removeAllCart();
  }

  applyPromo(){
    if(this.code.hasError('value')){

      console.log(this.code.getError('value').toString());
      console.log(Number(this.code.getError('value')));
      this.grandTotal = this.grandTotal-(this.grandTotal * Number(this.code.getError('value')/100))
       this.cartService.setTotalPrice(this.grandTotal);
    this.cartService.setDiscount(this.code.value);
      }
  }
  incr(item:any){
    console.log(item)
    if(item.qty +1 >item.quantity){
      alert('Product limit Exceed')
    }else{
      item.qty++;
      this.cartService.incrementQty(item)
      this.grandTotal = this.cartService.getTotalPrice();
      this.cartService.setTotalPrice(this.grandTotal);
    }
  }
  decr(item:any){
    console.log(item);

    if(item.qty -1 >0){

      item.qty=Number(item.qty)-1;
      this.cartService.incrementQty(item)
      this.grandTotal = this.cartService.getTotalPrice();
      this.cartService.setTotalPrice(this.grandTotal);
    }


  }
}
