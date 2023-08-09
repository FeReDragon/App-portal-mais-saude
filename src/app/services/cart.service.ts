import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../ecommerce-module/model/product.model';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartItems = new BehaviorSubject<CartItem[]>([]);
  
  constructor(private http: HttpClient) {
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
    const itemIndex = cartItems.findIndex(i => i.product.id === product.id);
  
    if (itemIndex > -1) {
      this.updateCartQuantity(itemIndex, cartItems[itemIndex].quantity + 1, userId);
    } else {
      this.http.post<CartItem>('http://localhost:3000/cartItems', {
        product,
        quantity: 1,
        userId
      }).subscribe((newItem) => {
        this._cartItems.next([...cartItems, newItem]);
      });
    }
  }
  
  updateCartQuantity(index: number, quantity: number, userId: number): Observable<CartItem> {
    const cartItems = this._cartItems.getValue();
    cartItems[index].quantity = quantity;
  
    return this.http.put<CartItem>(`http://localhost:3000/cartItems/${cartItems[index].id}`, cartItems[index]).pipe(
      tap(() => {
        this._cartItems.next(cartItems);
      })
    );
  }
  
  removeItem(item: CartItem) {
    const cartItems = this._cartItems.getValue();
    const index = cartItems.findIndex(i => i.product.id === item.product.id);
  
    if (index > -1) {
      this.http.delete(`http://localhost:3000/cartItems/${item.id}`).subscribe(() => {
        cartItems.splice(index, 1);
        this._cartItems.next(cartItems);
      });
    }
  }
  
  fetchCartItemsFromServer(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`http://localhost:3000/cartItems?userId=${userId}`).pipe(
      tap(response => {
        this._cartItems.next(response);
      })
    );
  }
  clearCart() {
    this._cartItems.next([]); // Limpe a lista de itens do carrinho
    // Chame a API para remover todos os itens do carrinho do servidor também
  }
  checkout(): Observable<any> {
    return this.http.post<any>('http://localhost:3000/checkout', {});
  }
  
}
