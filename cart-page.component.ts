import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    tax: 0,
    price: 0,
    discount: 0,
    total: 0,
    delivery: 0
  }
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit() {
    this.loadDetails()



  }
  Checkout() {
    this.router.navigate(["/checkout"]);
  }
  removeToCart(cardId: string | undefined) {
    cardId && this.product.removeToCart(cardId).subscribe((result) => {
      this.loadDetails()


    })

  }
  loadDetails() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      console.warn(this.cartData);
      let price = 0;
      result.forEach(item => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }

      });
      this.priceSummary.price = price;
      this.priceSummary.tax = price / 10;
      this.priceSummary.discount = price / 10;
      this.priceSummary.delivery = 100
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);

      if (!this.cartData.length) {
        this.router.navigate(["/"]);

      }
    })
  }

  getCartId() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;

    })
  }
}
