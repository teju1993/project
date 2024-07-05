import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signup, login } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { response } from 'express';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginErroe = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }
  userSignup(data: signup) {

    this.http.post(`http://localhost:3000/seller`, data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      });

  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userlogin(data: login) {
    this.http.get(`http://localhost:3000/seller?Email=${data.Email}&Password=${data.Password}`, { observe: 'response' })
      .subscribe((result: any) => {
        console.warn(result);
        if (result && result.body && result.body.length) {

          console.warn("user logged in ");
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);

        }
        else {
          console.warn("login failed");
          this.isLoginErroe.emit(true);
        }


      });

  }
}
