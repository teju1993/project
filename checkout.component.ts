import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;
  constructor(private product: ProductService, private route: Router) { }
  ngOnInit() {

    this.product.currentCart().subscribe((result) => {


      let price = 0;
      this.cartData = result;
      result.forEach(item => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }

      });

      this.totalPrice = price + (price / 10) + 100 - (price / 10);
    })
  }


  orderNow(data: { email: string, Address: string, contact: string }) {
    let user = localStorage.getItem("user")
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItem(item.id)
        }, 700);
      })
      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = "order has been placed";
          setTimeout(() => {
            this.orderMsg = undefined;
            this.route.navigate(['/my-order']);
          }, 4000);

        }
      })
    }
  }

}
