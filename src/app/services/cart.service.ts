import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product, CartItem, Order } from '../interfaces/IEcommerce';
import { EcommerceService } from './ecommerce.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartItems = new BehaviorSubject<CartItem[]>([]);
  private baseUrl = 'http://localhost:5215/api/Ecommerce'; 

  constructor(private http: HttpClient, private ecommerceService: EcommerceService) {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      this.fetchCartItemsFromServer(currentUser.id).subscribe();
    }
  }

  get cartItems() {
    return this._cartItems.asObservable();
  }

  getCurrentCartItemsValue(): CartItem[] {
    return this._cartItems.getValue();
  }

  addToCart(product: Product, userId: number) {
    const cartItems = this.getCurrentCartItemsValue();
    const itemIndex = cartItems.findIndex(i => i.productId === product.id); // Corrigido para productId

    if (itemIndex > -1) {
      this.ecommerceService.updateCartItem({
        ...cartItems[itemIndex],
        quantity: cartItems[itemIndex].quantity + 1
      }).subscribe(updatedItem => {
        cartItems[itemIndex] = updatedItem;
        this._cartItems.next(cartItems);
      });
    } else {
      this.ecommerceService.addProductToCart({
        id: 0,
        productId: product.id, // Corrigido para productId
        quantity: 1,
        userId
      }).subscribe(newItem => {
        this._cartItems.next([...cartItems, newItem]);
      });
    }
  }

  removeItem(item: CartItem) {
    this.ecommerceService.deleteCartItem(item.id).subscribe(() => {
      const cartItems = this._cartItems.getValue();
      const updatedCartItems = cartItems.filter(i => i.id !== item.id);
      this._cartItems.next(updatedCartItems);
    });
  }

  fetchCartItemsFromServer(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}/cartItems/${userId}`).pipe(
      tap(response => {
        this._cartItems.next(response);
      })
    );
  }
  

  clearCart() {
    this._cartItems.next([]);
    const userId = JSON.parse(localStorage.getItem('currentUser') || '{}').id;
    if (userId) {
      this.fetchCartItemsFromServer(userId).subscribe(items => {
        items.forEach(item => this.ecommerceService.deleteCartItem(item.id).subscribe());
      });
    }
  }

  checkout(order: Order): Observable<Order> {
    return this.ecommerceService.createOrder(order);
  }
}
export { CartItem, EcommerceService, Product };


