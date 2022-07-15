import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavListService {
  public favItemList : any = [];
  public productList = new BehaviorSubject<any>([]);
  constructor() { }
  getProducts() {
    return this.productList.asObservable();
  }
  SetProduct(product:any) {
    this.favItemList.push(...product);
    this.productList.next(product);
  }
  addtoFav(product:any){
    this.favItemList.push(product);
    this.productList.next(this.favItemList);
  
  }
  removeFavItem(product:any){
    this.favItemList.map((a:any,index:any)=>{
      if(a.id == product.id){
        this.favItemList.splice(index,1);
      }
    })
    this.productList.next(this.favItemList);
  }

}
