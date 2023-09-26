import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '../../interfaces/IEcommerce';
import { EcommerceService } from '../../services/ecommerce.service';
import { CartService } from '../../services/cart.service';
import { AuthenticationService, User } from '../../services/authentication.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: any[] = [];
  currentUser: User | null = null;
  loading = true;

  constructor(
    private ecommerceService: EcommerceService,
    private cartService: CartService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ecommerceService.getProductList().subscribe((products: Product[]) => {
      this.products = products;
      this.loading = false;
    });

    this.ecommerceService.getCategories().subscribe((categories: any[]) => {
      this.categories = categories;
    });

    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.cartService.fetchCartItemsFromServer(this.currentUser.id).subscribe();
    }
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
