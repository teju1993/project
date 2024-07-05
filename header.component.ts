import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = "";
  searchResult: undefined | product[]
  userName: string = "";
  cartItem = 0;
  constructor(private route: Router, private product: ProductService) { }


  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          //console.warn("in seller area");
          this.menuType = "seller"
          if (localStorage.getItem('seller')) {
            let localStore = localStorage.getItem('seller');
            let localData = localStore && JSON.parse(localStore)[0];
            this.sellerName = localData.Name
            this.menuType = 'seller'
          }
        }
        else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.Name
          this.menuType = 'user';
          this.product.getCartList(userData.id);

        }
        else {
          console.warn("outside area");
          this.menuType = 'default';
        }
      }

    });
    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      this.cartItem = JSON.parse(cartData).length;
    }

    this.product.cartData.subscribe((item) => {
      this.cartItem = item.length;
    })
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([])
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      //console.warn(element);

      this.product.searchProducts(element.value).subscribe((result) => {

        this.searchResult = result;
      })
    }
  }
  hidesearch() {
    this.searchResult = undefined
  }
  redirectToDetail(id: string) {
    this.route.navigate(['/details/' + id]);

  }
  submitSearch(val: string) {
    this.route.navigate([`search/${val}`])
  }
} 