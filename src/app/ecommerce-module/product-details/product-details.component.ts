import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EcommerceService } from '../../services/ecommerce.service';
import { CartService } from '../../services/cart.service';
import { AuthenticationService, User } from '../../services/authentication.service'; 
import { Product } from 'src/app/interfaces/IEcommerce';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  categories: any[] = [];
  currentUser: User | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private ecommerceService: EcommerceService,
    private cartService: CartService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.ecommerceService.getProductDetails(Number(params.get('id')))
      )
    ).subscribe(
      (product: Product) => {
        this.product = product;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading product details:', error);
      }
    );

    this.ecommerceService.getCategories().subscribe((categories: any[]) => {
      this.categories = categories;
    });

    this.currentUser = this.authService.getCurrentUser();
  }

  addToCart(product: Product) {
    if (this.currentUser) {
      this.cartService.addToCart(product); // Modificado aqui
    }
    return of(null);
  }

  buyNow(product: Product) {
    this.addToCart(product).subscribe(() => {
      this.router.navigate(['/checkout']);
    });
  }

  getCategoryNameById(id: number): string {
    const category = this.categories.find(cat => cat.id === id);
    return category ? category.name : 'Desconhecido';
  }
}










