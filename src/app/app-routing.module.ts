import { OtherComponent } from './other/other.component';
import { StyleComponent } from './style/style.component';
import { ChildrenComponent } from './children/children.component';
import { SportComponent } from './sport/sport.component';
import { HomeComponent } from './home/home.component';
import { HealthComponent } from './health/health.component';
import { AuthServiceService } from './service/auth-service.service';
import { RedirectionService } from './service/redirection.service';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ElectronicsComponent } from './electronics/electronics.component';
import { FavListComponent } from './fav-list/fav-list.component';
import { LandingComponent } from './landing/landing.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:'',component:LandingComponent},
  {path:'login',component:LoginComponent,canActivate:[RedirectionService]},
   {path:'products',component:ElectronicsComponent},
    {path:'health',component:HealthComponent},
    {path:'home',component:HomeComponent},
    {path:'sporting',component:SportComponent},
    {path:'children',component:ChildrenComponent},
    {path:'style',component:StyleComponent},
    {path:'other',component:OtherComponent},
  {path:'Cart',component:CartComponent},
  {path:'Fav-list',component:FavListComponent,canActivate:[RedirectionService]},
  {path:'Product-Form',component:ProductFormComponent,canActivate:[RedirectionService]},
  {path:'product/:id',component:ProductPageComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'profile',component:ProfileComponent,canActivate:[RedirectionService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
