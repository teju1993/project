import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { signup, login } from '../data-type';
import { isErrored } from 'stream';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller: SellerService, private router: Router) { }
  showLogin = false;
  authError: string = "";
  ngOnInit(): void {
    // this.seller.reloadSeller()
  }
  signUp(data: signup): void {
    this.seller.userSignup(data)

  }
  login(data: login): void {
    //console.warn(data);
    this.seller.userlogin(data);
    this.seller.isLoginErroe.subscribe((isErrored) => {
      if (isErrored) {
        this.authError = "Email and password is not match";
      }
    });
  }
  openLogin() {
    this.showLogin = true;

  }
  opensignUp() {

    this.showLogin = false;
  }
}

