import { AuthServiceService } from './auth-service.service';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private Auth:AuthServiceService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.Auth.getToken()){

      req=req.clone({setHeaders:{Authorization:`Bearer ${this.Auth.getToken()}`}})

    }

   return next.handle(req);
  }
}


