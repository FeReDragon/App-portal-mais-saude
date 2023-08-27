import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { Product } from '../model/product.model';
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
  categories: any[] = []; // Nova propriedade para armazenar as categorias
  currentUser: User | null = null;
  loading = true;

  constructor(
    private ecommerceService: EcommerceService,
    private cartService: CartService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obter produtos
    this.ecommerceService.getProductList().subscribe((products: Product[]) => {
      this.products = products;
      setTimeout(() => {
        this.loading = false;
      }, 300);
    });

    // Obter categorias
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
      this.cartService.addToCart(product, this.currentUser.id);
    }
    return of(null);
  }

  buyNow(product: Product) {
    this.addToCart(product).subscribe(() => {
      this.router.navigate(['/checkout']);
    });
  }

  // Nova função para encontrar o nome da categoria usando o ID
  getCategoryNameById(id: number): string {
    const category = this.categories.find(cat => cat.id === id);
    return category ? category.name : 'Desconhecido';
  }
}
