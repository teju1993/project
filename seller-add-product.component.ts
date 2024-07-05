import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent implements OnInit {
  ProductMessage: string | undefined;
  constructor(private router: Router, private product: ProductService) { }
  ngOnInit() { }
  AddProduct(data: product) {
    this.product.addProduct(data).subscribe((result) => {
      console.warn(result)
      if (result) {
        this.ProductMessage = "New poduct successfully added";
      }


    });
    setTimeout(() => {
      this.ProductMessage = undefined

    }, 3000);

  }
}