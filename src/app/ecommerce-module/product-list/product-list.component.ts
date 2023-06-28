import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { EcommerceService } from '../../services/ecommerce.service'; // Importação do serviço

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private ecommerceService: EcommerceService) { } // Injeção do serviço

  ngOnInit(): void {
    this.ecommerceService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

}



