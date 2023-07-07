import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from '../model/product.model';
import { EcommerceService } from '../../services/ecommerce.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
addToCart(arg0: number) {
throw new Error('Method not implemented.');
}
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private ecommerceService: EcommerceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.ecommerceService.getProductDetails(Number(params.get('id')))
      )
    ).subscribe(
      (product: Product) => {
        this.product = product;
      },
      (error) => {
        // Lógica de tratamento de erro, se necessário
        console.error('Error loading product details:', error);
      }
    );
  }
}







