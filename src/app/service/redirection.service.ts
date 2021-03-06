import { AuthServiceService } from './auth-service.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RedirectionService implements CanActivate {


  constructor(private activeRoute:Router,private userService:AuthServiceService) { }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    console.log(route.routeConfig?.path)
    let check = await this.userService.isAuthenticated();
    if(route.routeConfig?.path == "Fav-list"&&check){
      return true;
    }
    console.log(check);
    if(check){
     this.activeRoute.navigate(['']);
     return false;
    }else{
      return true;
    }
  }

}
