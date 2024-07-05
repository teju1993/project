import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  productdetails: undefined | product
  productquantity: number = 1
  removeToCart = false;
  cardData: product | undefined
  constructor(private activateroute: ActivatedRoute, private product: ProductService) { }
  ngOnInit(): void {
    let productId = this.activateroute.snapshot.paramMap.get('productId')
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productdetails = result;


      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: product) => productId == item.id.toString());
        if (items.length) {
          this.removeToCart = true;
        }
        else {
          this.removeToCart = false;
        }
      }
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result) => {
          let item = result.filter((item: product) => productId?.toString() === item.productId?.toString())
          if (item.length) {
            this.cardData = item[0];
            this.removeToCart = true;
          }
        })
      }

    })

  }
  handlequntity(val: string) {
    if (this.productquantity < 20 && val === 'plus') {
      this.productquantity += 1;
    } else if (this.productquantity > 1 && val === 'min')
      this.productquantity -= 1;
  }
  addToCart() {
    if (this.productdetails) {
      this.productdetails.quantity = this.productquantity;

      if (!localStorage.getItem('user')) {

        this.product.localToCart(this.productdetails);
        this.removeToCart = true;
      }
      else {

        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;


        console.warn(userId);
        let cartData: cart = {
          ...this.productdetails, userId,
          productId: this.productdetails.id,
        }
        console.warn(cartData);
        //delete cartData.id;

        this.product.addTocart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeToCart = true;
          }

        })
      }
    }

  }
  get Userid() {
    return localStorage.getItem('id');
  }
  removeCart(productId: string) {
    if (!localStorage.getItem('user')) {

      this.product.removeToItemCart(productId);

    }
    else {
      this.cardData && this.product.removeToCart(this.cardData.id).subscribe((result) => {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;

        this.product.getCartList(userId)

      });
    }
    this.removeToCart = false;
  }
}


