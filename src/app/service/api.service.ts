import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserData } from '../shared/UserData';

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
    return this.http.post(environment.baseUrl+"User/Comment",comment);
  }
  getProductById(productId:number){
    return this.http.get<any>(environment.baseUrl+"Product/GetProductById?productId="+productId);
  }
  getTopSelling(){
    return this.http.get<any>(environment.baseUrl+"Product/MostPopularProduct");
  }
  getMyProfile(){
    return this.http.get(environment.secondUrl+"User/GetUserProfile");
  }
  editProfile(userData:UserData){
    return this.http.put(environment.secondUrl+"User/EditUserProfile",userData);
  }
  updateComment(id:any,comment:any){
    return this.http.post(environment.baseUrl+"User/EditComment",{id:id,message:comment});
  }
  deleteComment(id:any){
    console.log(id)
    return this.http.delete(environment.baseUrl+"User/DeleteComment?id="+id);
  }
  rate(rate:any){
    return this.http.post(environment.baseUrl+"User/Rate",rate);
  }
}
