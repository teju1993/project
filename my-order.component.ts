import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css'
})
export class MyOrderComponent implements OnInit {
  orderData: order[] | undefined
  constructor(private product: ProductService) { }
  ngOnInit(): void {
    this.getOrderList();


  }
  cancelOrder(orderId: string | undefined) {
    orderId && this.product.cancelOrder(orderId).subscribe((result) => {
      if (result) {
        this.getOrderList();
      }
    })
  }

  getOrderList() {
    this.product.orderList().subscribe((result) => {
      this.orderData = result;
    })
  }

}