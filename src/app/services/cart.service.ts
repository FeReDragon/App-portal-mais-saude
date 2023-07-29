import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../ecommerce-module/model/product.model';
import { tap } from 'rxjs/operators';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartItems = new BehaviorSubject<CartItem[]>([]);
  
  constructor(private http: HttpClient) {
    this.fetchCartItemsFromServer().subscribe();
  }
  
  get cartItems() {
    return this._cartItems.asObservable();
  }
  
  getCurrentCartItemsValue(): CartItem[] {
    return this._cartItems.getValue();
  }
  
  addToCart(product: Product) {
    const cartItems = this.getCurrentCartItemsValue();
    const itemIndex = cartItems.findIndex(i => i.product.id === product.id);
  
    if (itemIndex > -1) {
      // Increase quantity and update the item on the server
      this.updateCartQuantity(itemIndex, cartItems[itemIndex].quantity + 1).subscribe();
    } else {
      // Create a new cart item and save to server
      this.http.post<CartItem>('http://localhost:3000/cartItems', {
        product,
        quantity: 1
      }).subscribe((newItem) => {
        // Add the new item to local cart items list
        this._cartItems.next([...cartItems, newItem]);
      });
    }
  }

  updateCartQuantity(index: number, quantity: number): Observable<CartItem> {
    const cartItems = this._cartItems.getValue();
    cartItems[index].quantity = quantity;
  
    // Update the item on the server
    return this.http.put<CartItem>(`http://localhost:3000/cartItems/${cartItems[index].id}`, cartItems[index]).pipe(
      tap(() => {
        // Update local cart items list
        this._cartItems.next(cartItems);
      })
    );
  }

  removeItem(item: CartItem) {
    const cartItems = this._cartItems.getValue();
    const index = cartItems.findIndex(i => i.product.id === item.product.id);

    if (index > -1) {
      // Remove item from server
      this.http.delete(`http://localhost:3000/cartItems/${item.id}`).subscribe(() => {
        // Remove item from local cart items list
        cartItems.splice(index, 1);
        this._cartItems.next(cartItems);
      });
    }
  }

  fetchCartItemsFromServer(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>('http://localhost:3000/cartItems').pipe(
      tap(response => {
        this._cartItems.next(response);
      })
    );
  }
}

