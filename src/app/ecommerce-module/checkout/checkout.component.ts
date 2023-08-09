import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  items: CartItem[] = [];
  totalItems = 0;
  totalPrice = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems.subscribe((cartItems: CartItem[]) => {
      this.items = cartItems;
      this.calculateTotal();
    });
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeItem(item);
  }

  calculateTotal() {
    this.totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
    this.totalPrice = this.items.reduce((total, item) => total + (item.product.preco * item.quantity), 0);
  }

  checkout() {
    // Implement your checkout logic here
    // This method will handle the checkout process
    // For example, you can navigate to a checkout page or show a success message
  }
}
