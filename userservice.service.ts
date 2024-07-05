import { EventEmitter, Injectable } from '@angular/core';
import { login, signup } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { json } from 'stream/consumers';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient, private router: Router) { }
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginErroe = new EventEmitter<boolean>(false);
  inValidUserAuth = new EventEmitter<boolean>(false);
  userSignup(user: signup) {
    this.http.post("http://localhost:3000/user", user, { observe: 'response' })
      .subscribe((result) => {
        console.warn(result);
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      })
  }

  userlogin(data: login) {
    this.http.get<signup[]>(`http://localhost:3000/user?Email=${data.Email}&Password=${data.Password}`, { observe: 'response' })
      .subscribe((result) => {
        console.warn(result);
        if (result && result.body?.length) {
          this.inValidUserAuth.emit(false)
          console.warn("user logged in ");
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
          this.inValidUserAuth.emit(false);

        }
        else {
          console.warn("login failed");
          this.inValidUserAuth.emit(true);
        }

      })
  }
  userreload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);

    }
  }
}