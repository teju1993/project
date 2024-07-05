import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Input, Output, input } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order, product } from '../data-type';
import { query, response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  @Output() cartData = new EventEmitter<product[] | []>();


  constructor(private router: Router, private http: HttpClient) { }


  addProduct(data: product) {
    return this.http.post(`http://localhost:3000/Products`, data);
  }

  productList() {
    return this.http.get<product[]>(`http://localhost:3000/Products`);
  }
  deleteproduct(id: string) {
    return this.http.delete(`http://localhost:3000/Products/${id}`);
  }
  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/Products/${id}`);
  }
  updateProduct(product: product) {
    return this.http.put<product>(`http://localhost:3000/Products/${product.id}`, product);

  }
  popularproducts() {
    return this.http.get<product[]>(`http://localhost:3000/Products?_limit=3`);
  }
  trendyProducts() {
    return this.http.get<product[]>(`http://localhost:3000/Products?_limit=5`);
  }

  searchProducts(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/Products?name=${query}`);
  }
  localToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    }
    else {
      cartData = JSON.parse(localCart);
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);

    }

  }

  removeToItemCart(productId: string) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);

      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);

    }
  }
  addTocart(cartData: cart) {
    return this.http.post(`http://localhost:3000/cart`, cartData);
  }
  getCartList(userId: string) {
    return this.http.get<product[]>(`http://localhost:3000/cart?userId=` + userId, {
      observe: 'response'
    }).subscribe((result) => {
      console.warn(result);
      if (result && result.body) {
        this.cartData.emit(result.body);

      }
    })

  }
  removeToCart(cardId: string) {
    return this.http.delete(`http://localhost:3000/cart/` + cardId);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(`http://localhost:3000/cart?userId=` + userData.id);

  }
  orderNow(data: order) {
    return this.http.post(`http://localhost:3000/orders`, data);

  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(`http://localhost:3000/orders?userId=` + userData.id);

  }
  deleteCartItem(cardId: string) {
    return this.http.delete(`http://localhost:3000/cart/` + cardId).subscribe((result) => {
      this.cartData.emit([]);

    })
  }
  cancelOrder(orderId: string) {
    return this.http.delete(`http://localhost:3000/orders/` + orderId);


  }
}