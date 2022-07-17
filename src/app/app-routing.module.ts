import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ElectronicsComponent } from './electronics/electronics.component';
import { FavListComponent } from './fav-list/fav-list.component';
import { LandingComponent } from './landing/landing.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductPageComponent } from './product-page/product-page.component';

const routes: Routes = [
  {path:'',component:LandingComponent},
  {path:'Electronics',component:ElectronicsComponent},
  {path:'Cart',component:CartComponent},
  {path:'Fav-list',component:FavListComponent},
  {path:'Product-Form',component:ProductFormComponent},
  {path:'product/:id',component:ProductPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
