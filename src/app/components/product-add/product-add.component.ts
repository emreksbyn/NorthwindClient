import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ["", Validators.required],
      unitPrice: ["", Validators.required],
      unitsInStock: ["", Validators.required],
      categoryId: ["", Validators.required]
    })
  }

  add() {
    if (this.productAddForm.valid) {
      let productModel = Object.assign({}, this.productAddForm.value)
      this.productService.add(productModel).subscribe(response => {
        console.log(response)
      }, responseError => {
        if (responseError.error.ValidationErrors.length > 0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            // this.toastr.error(...) toastr ekleyince duzelt.
            console.log(responseError.error.ValidationErrors[i].ErrorMessage, "Dogrulama hatasi")
          }
        }
      })
    } else {
      console.log("Hata var. Bilgiler Eksik.")
    }
  }
  //#region 
  // add() {
  //   if (this.productAddForm.valid) {
  //     let productModel = Object.assign({}, this.productAddForm.value)
  //     of(this.productService.add(productModel).subscribe({
  //       next: (response) => console.log(response.message),
  //       error: (responseError) => console.log(responseError)
  //     }))
  //   } else {
  //     console.log("Hata var. Bilgiler Eksik.")
  //   }
  // }
  //#endregion

}