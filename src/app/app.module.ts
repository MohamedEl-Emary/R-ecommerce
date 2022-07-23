import { AuthServiceService } from './service/auth-service.service';
import { LoginComponent } from './login/login.component';
import { InterceptorService } from './service/InterceptorService';
 import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { ElectronicsComponent } from './electronics/electronics.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CartComponent } from './cart/cart.component';
import { FavListComponent } from './fav-list/fav-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {  FormsModule,ReactiveFormsModule } from '@angular/forms';
import { StarComponent } from './star/star.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    LandingComponent,
    ElectronicsComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    FavListComponent,
    ProductFormComponent,
    ProductPageComponent,
    CheckoutComponent,
    LoginComponent,
    StarComponent,
    ProfileComponent
  ]
  ,
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:InterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
