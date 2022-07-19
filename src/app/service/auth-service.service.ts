import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }
  getToken(){
   return localStorage.getItem("token");
  }
  async isAuthenticated(){
   var auth ;
  let res= this.http.get<any>(environment.baseUrl+"User/CheckAuthentication").toPromise();
  console.log(res);
   return res;
  }


  Login(data:any):Observable<any>{
    return this.http.post<any>(environment.baseUrl+"User/Login",data);
  }
}
