import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.fetchCartItemsFromServer().subscribe();
    this.cartService.cartItems.subscribe(items => {
      this.cartItems = items;
    });
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeItem(item);
  }

  get totalItems() {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  get totalPrice() {
    return this.cartItems.reduce((acc, item) => acc + (item.quantity * item.product.preco), 0);
  }

  checkout() {
    // Implement your checkout logic here
  }
}

