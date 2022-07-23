import { FormBuilder, Validators } from '@angular/forms';
import { Product } from './../shared/product';
import { ApiService } from './../service/api.service';
import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit,AfterContentChecked {
  products!:Array<any>;
  editModel={
    name:'',
    description:'',
    price:0,
    discount:'',
    quantity:0,
    category:-1,
    picture:"",
    id:-1
  };
  constructor(private api:ApiService,private fb:FormBuilder, private changeDetector: ChangeDetectorRef) { }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  editForm = this.fb.group({
    name:["",{validators:[Validators.required,Validators.minLength(4)]}],
    description:[],
    price:[1,{validators:[Validators.min(1)]}],
    discount:[0,{validators:[Validators.min(0),Validators.required]}],
    quantity:[1,{validators:[Validators.min(1),Validators.required]}],
    catergory:[0,{validators:[Validators.min(0),Validators.required]}],
    picture:['',{validators:[Validators.required]}],
     id:[Validators.required]
  });
  ngOnInit(): void {
    this.myProducts();
  }
  myProducts(){
    this.api.getMyProducts().subscribe(res =>{
      let con = res as [];
     this.products = con;
     console.log(this.products);
    })
  }
  edit(Product:any){
    this.editModel = Product;
    this.editForm.patchValue({
    id:this.editModel.id
    });
    console.log( this.editForm)
  }
  update(){

    if(this.editForm.valid)
    {
      this.api.updateProduct(this.editForm.value).subscribe(e=>{
        if(e==true){
       this.products.forEach(e=>{
        if(e.id == this.editForm.value.id){
          e = this.editForm.value;
          console.log(e);

        }
       })
        }
      });
      console.log(this.editForm);
    }
  }

}
