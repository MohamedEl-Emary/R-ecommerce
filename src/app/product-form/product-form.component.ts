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
    id:[Validators.required]
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
    category:[{validators:[Validators.required]}],
    picture:['',{validators:[Validators.required]}],
     id:[]
  });

  addForm = this.fb.group({
    name:["",{validators:[Validators.required,Validators.minLength(4)]}],
    description:[],
    price:[1,{validators:[Validators.min(1)]}],
    discount:[0,{validators:[Validators.min(0),Validators.required]}],
    quantity:[1,{validators:[Validators.min(1),Validators.required]}],
    category:[0],
    picture:['',{validators:[Validators.required]}],
     id:[]
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
     console.log(Product)
     console.log(this.products)

    this.editForm.patchValue({
    id:this.editModel.id
    });
    console.log( this.editForm)
  }

  update(){

    if(this.editForm.valid)
    {
      this.editForm.value.category;
      console.log(this.editForm.value);
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
  delete(product:any){
    console.log(product.id)
     this.api.deleteProduct(product.id).subscribe(res=>{
      if(res == true){
      for (let index = 0; index < this.products.length; index++) {
         if(this.products[index].id == product.id)
        {
          this.products.splice(index,1);
          break;
        }
      }
      }
     });
  }
  add(){
    if(this.addForm.valid){

      this.api.addProduct(this.addForm.value).subscribe(e=>{
        console.log(this.addForm.get("category"))
        console.log(this.addForm.value)
        if(e!=-1){
          this.addForm.value.id = e;
          this.products.push(this.addForm.value);
          //this.editModel.category = this.editForm.value.cate

          this.editForm.reset();
        }
      });
    }else{
      alert("Can't Add Product At this Time")
      console.log(this.addForm)
    }

  }

}
