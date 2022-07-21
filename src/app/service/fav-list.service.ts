import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavListService {
  public favItemList : any = [];
  public productList = new BehaviorSubject<any>([]);
  constructor(private http:HttpClient) { }
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

  }
  addFavorite(product:any){
    this.http.post(environment.baseUrl+'User/AddToFavorite',{productId:product.id}).subscribe(res=>{
      let convert = res as (HttpErrorResponse);
      if(convert.error ==-1){
        alert('can \'t add Product ')
      }else{
        product.favId = res;
        this.addtoFav(product);
      }
    });
  }
  getFavorite(){
    return this.http.get(environment.baseUrl+'User/GetMyFavorites');
  }

}
