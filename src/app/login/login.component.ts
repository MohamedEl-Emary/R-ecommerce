import { ApiService } from './../service/api.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import{FormsModule, ReactiveFormsModule} from '@angular/forms'




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    email:['',Validators.email],
    password:['',Validators.required]

  });
  constructor(private api:ApiService,private Auth:AuthServiceService,private fb:FormBuilder,private route:Router) {



  }



   ngOnInit() {

  }
Submit(){
  this.Auth.Login(this.form.value).subscribe(data=>{
    localStorage.setItem("token",data as string);
    this.api.getMyProfile().subscribe(res=>{
      localStorage.setItem("profile",JSON.stringify(res));
    })
    console.log(localStorage.getItem("token"));
    this.route.navigate(['']);
  });
}
}
