import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  status:boolean = false;
  top!:Array<any>;
  constructor(private api:ApiService) { }
  ngOnInit(): void {

   this.TopSelling();
  }

  changeIcon(){
    this.status = !this.status;

  }
  TopSelling(){
   this.api.getTopSelling().subscribe(res=>{
    console.log(res);
    this.top = res;
   });
  }

}
