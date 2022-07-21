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

const routes: Routes = [
  {path:'',component:LandingComponent},
  {path:'login',component:LoginComponent,canActivate:[RedirectionService]},
  {path:'Electronics',component:ElectronicsComponent},
  {path:'Cart',component:CartComponent},
  {path:'Fav-list',component:FavListComponent,canActivate:[RedirectionService]},
  {path:'Product-Form',component:ProductFormComponent},
  {path:'product/:id',component:ProductPageComponent},
  {path:'checkout',component:CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
