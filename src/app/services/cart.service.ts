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
    const itemIndex = cartItems.findIndex(i => i.product.id === product.id);

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
        id: 0, // ID será gerado pelo servidor
        product,
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
    return this.http.get<CartItem[]>(`http://localhost:5215/cartItems?userId=${userId}`).pipe(
      tap(response => {
        this._cartItems.next(response);
      })
    );
  }

  clearCart() {
    // Limpe a lista de itens do carrinho
    this._cartItems.next([]);

    // Chame a API para remover todos os itens do carrinho do servidor também
    const userId = JSON.parse(localStorage.getItem('currentUser') || '{}').id;
    if (userId) {
      this.fetchCartItemsFromServer(userId).subscribe(items => {
        items.forEach(item => this.ecommerceService.deleteCartItem(item.id).subscribe());
      });
    }
  }

  checkout(order: Order): Observable<Order> {
    // Substitua por seu modelo de Order
    return this.ecommerceService.createOrder(order);
  }

}
