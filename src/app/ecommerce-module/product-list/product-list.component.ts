import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importação necessária para a navegação
import { of, Observable } from 'rxjs'; // Importações para Observable
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
  currentUser: User | null = null; 

  constructor(
    private ecommerceService: EcommerceService,
    private cartService: CartService,
    private authService: AuthenticationService,
    private router: Router // Injeção do serviço Router
  ) {}

  ngOnInit(): void {
    this.ecommerceService.getProductList().subscribe((products: Product[]) => {
      this.products = products;
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
}
