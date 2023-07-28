import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { EcommerceService } from '../../services/ecommerce.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private ecommerceService: EcommerceService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.ecommerceService.getProductList().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}


