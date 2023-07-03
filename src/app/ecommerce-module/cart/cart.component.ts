import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
removeFromCart(_t8: CartItem) {
throw new Error('Method not implemented.');
}
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems.subscribe(items => {
      this.cartItems = items;
    });
  }

  onItemRemoved(item: CartItem) {
    this.cartService.removeItem(item);
  }

  onQuantityChanged(item: CartItem, quantity: number) {
    this.cartService.updateCartQuantity(item, quantity);
  }

  get totalItems() {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  get totalPrice() {
    return this.cartItems.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);
  }

  checkout() {
    // Implement your checkout logic here
  }
}
