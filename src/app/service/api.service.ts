import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  getProduct(){
    return this.http.get<any>(environment.baseUrl+"Product/GetAllProducts")
    .pipe(map((res:any)=>{
      return res;
    }));
  }
  getComments(id:number){
    return this.http.get<any>(environment.baseUrl+"Product/GetProductComments?productId="+id);
  }
  postComment(comment:any){
    this.http.post(environment.baseUrl+"User/Comment",comment).subscribe(res=>{

    });
  }
  getProductById(productId:number){
    return this.http.get<any>(environment.baseUrl+"Product/GetProductById?productId="+productId);
  }
}
