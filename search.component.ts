import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchResult: undefined | product[]
  constructor(private activateroute: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let query = this.activateroute.snapshot.paramMap.get('query');
    console.warn(query);
    query && this.product.searchProducts(query).subscribe((result) => {
      this.searchResult = result;
    })
  }


}
