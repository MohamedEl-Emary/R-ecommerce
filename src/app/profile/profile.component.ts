import { UserData } from './../shared/UserData';
import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  //profile=JSON.parse(localStorage.getItem("profile")!.toString())
  userData!:any;
  changesModel={address:"",phoneNumber:"",photoUrl:""};
  placeholder = "../../../../assets/img/logo.png"
  constructor(private api:ApiService) {

   }

  ngOnInit(): void {
    this.api.getMyProfile().subscribe( data=>{
      let conv = data as UserData;
      this.changesModel.address =conv.address;
    this.changesModel.phoneNumber = conv.phoneNumber;
    this.changesModel.photoUrl = conv.photoUrl;

    this.userData = data;
console.log( this.changesModel , conv,conv.photoUrl);
    })
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    const reload = location.reload();


  }
  update(){
    this.userData.address=this.changesModel.address;
    this.userData.phoneNumber=this.changesModel.phoneNumber;
    this.userData.photoUrl=this.changesModel.photoUrl;
    this.api.editProfile(this.userData).subscribe(data=>{
      console.log(data);
    });
      console.log(this.userData);
    }

}
