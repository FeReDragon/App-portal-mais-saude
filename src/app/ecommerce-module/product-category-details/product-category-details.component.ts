import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EcommerceService } from '../../services/ecommerce.service';
import { Product } from '../../interfaces/IEcommerce';
import { of } from 'rxjs';

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
        const category = params.get('category');
        if (category) {
          // Converta a categoria para number antes de passar para getProductsByCategory
          return this.ecommerceService.getProductsByCategory(Number(category));
        } else {
          // Trate o caso em que a categoria não é fornecida ou não pode ser convertida para número
          // Por exemplo, você pode retornar um Observable vazio
          return of([]);
        }
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



