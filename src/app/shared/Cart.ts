import { Product } from './product';
export class Cart{
  orderProducts:Array<any>
  totalPrice: number
  discountCode: string
  method: string

  constructor(orderProducts:Array<any>,totalPrice:number,discountCode:string,method:string) {
    this.orderProducts = orderProducts;
    this.discountCode = discountCode;
    this.totalPrice = totalPrice;
    this.method = method;
  }
}
