import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { EcommerceService } from '../../services/ecommerce.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private ecommerceService: EcommerceService) {}

  ngOnInit(): void {
    this.ecommerceService.getProductList().subscribe((products: Product[]) => {
      this.products = products;
    });
  }
}





