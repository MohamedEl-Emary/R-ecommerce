import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ElectronicsComponent } from './electronics/electronics.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {path:'',component:LandingComponent},
  {path:'Electronics',component:ElectronicsComponent},
  {path:'Cart',component:CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
