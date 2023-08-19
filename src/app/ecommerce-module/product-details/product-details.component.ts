import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { EcommerceService } from '../../services/ecommerce.service';
import { CartService } from '../../services/cart.service';
import { AuthenticationService, User } from '../../services/authentication.service'; 

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  currentUser: User | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private ecommerceService: EcommerceService,
    private cartService: CartService, // Injeção do CartService
    private authService: AuthenticationService, // Injeção do AuthService
    private router: Router // Injeção do serviço Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.ecommerceService.getProductDetails(Number(params.get('id')))
      )
    ).subscribe(
      (product: Product) => {
        this.product = product;
        setTimeout(() => {
          this.loading = false; // Define loading como false após 500ms
        }, 300);
      },
      (error) => {
        console.error('Error loading product details:', error);
      }
    );

    this.currentUser = this.authService.getCurrentUser();
  }

  addToCart(product: Product) {
    if (this.currentUser) {
      this.cartService.addToCart(product, this.currentUser.id);
    }
    return of(null);
  }

  buyNow(product: Product) {
    this.addToCart(product).subscribe(() => {
      this.router.navigate(['/checkout']);
    });
  }
}









