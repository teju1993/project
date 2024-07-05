import { Component, OnInit } from '@angular/core';
import { cart, login, product, signup } from '../data-type';
import { UserserviceService } from '../services/userservice.service';

import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit {
  authError: string = "";
  showLogin: boolean = true

  constructor(private userservice: UserserviceService, private product: ProductService) { }
  ngOnInit(): void {
    this.userservice.userreload();

  }



  SignUp(data: signup) {

    this.userservice.userSignup(data);

  }

  login(data: login) {
    this.userservice.userlogin(data);
    this.userservice.inValidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = "user Not Found";
      }
      else {
        console.warn('login suucess');

        this.localCartToRemoteCart();




      }
    });
  }
  openLogin() {
    this.showLogin = true;

  }
  opensignUp() {
    this.showLogin = false;
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user1 = localStorage.getItem('user');
    let userId = user1 && JSON.parse(user1).id;

    if (data) {
      let cardList: product[] = JSON.parse(data);
      cardList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,

          productId: product.id,
          // productId: this..id,

          userId,

        };
        //delete cartData.id;

        setTimeout(() => {
          this.product.addTocart(cartData).subscribe((result) => {
            if (result) {
              console.warn('item stored in DB');
            }

          })

        }, 500);
        if (cardList.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      });
    }


    setTimeout(() => {
      this.product.getCartList(userId);

    }, 2000);
  }
}

