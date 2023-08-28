import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from '../model/product.model';
import { EcommerceService } from '../../services/ecommerce.service';
import { CartService } from '../../services/cart.service';
import { AuthenticationService, User } from '../../services/authentication.service'; 

@Component({
  selector: 'app-product-category-details',
  templateUrl: './product-category-details.component.html',
  styleUrls: ['./product-category-details.component.scss']
})
export class ProductCategoryDetailsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private ecommerceService: EcommerceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const category = params.get('category') ?? ''; // Use uma string vazia como valor padrão se category for null
        return this.ecommerceService.getProductsByCategory(category);
      })
    ).subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error) => {
        // Lógica de tratamento de erro, se necessário
        console.error('Error loading products by category:', error);
      }
    );
  }
  
}



