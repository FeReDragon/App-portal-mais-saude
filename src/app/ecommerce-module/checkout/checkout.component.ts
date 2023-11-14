import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../services/cart.service';
import { EcommerceService, Product } from '../../services/ecommerce.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  items: CartItem[] = [];
  products: Product[] = [];
  totalItems = 0;
  totalPrice = 0;
  loading = true;

  constructor(private cartService: CartService, private ecommerceService: EcommerceService) { }

  ngOnInit(): void {
    this.cartService.cartItems.subscribe((cartItems: CartItem[]) => {
      this.items = cartItems;
      // Usando forkJoin para lidar com múltiplos observáveis
      const productObservables = cartItems.map(item => this.ecommerceService.getProductById(item.productId));
      forkJoin(productObservables).subscribe(products => {
        this.products = products;
        this.calculateTotal();
        this.loading = false;
      });
    });
  }

  calculateTotal() {
    this.totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
    this.totalPrice = this.products.reduce((total, product) => total + (product.preco * this.items.find(item => item.productId === product.id)!.quantity), 0);
  }
  
  removeFromCart(item: CartItem) {
    this.cartService.removeItem(item);
  }
  
  checkout() {
    // Implement your checkout logic here
    // This method will handle the checkout process
    // For example, you can navigate to a checkout page or show a success message
  }
  // ... (outros métodos já existentes)
}



