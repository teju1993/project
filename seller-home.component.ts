import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[]
  poductMessage: string | undefined;
  icon = faTrash;
  editIcon = faEdit;
  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.list();
  }
  deleteProduct(id: string) {
    console.warn("test", id);
    this.product.deleteproduct(id).subscribe((result) => {
      if (result) {

        this.poductMessage = "Product is delete";
        this.list();
      }
    })
    setTimeout(() => {
      this.poductMessage = undefined

    }, 3000);


  }
  list() {
    this.product.productList().subscribe((result) => {
      console.warn(result);
      this.productList = result;

    })
  }
}
