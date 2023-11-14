import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Product, CartItem, Order, User } from '../interfaces/IEcommerce'; // Adicione a importação de User se não estiver presente
import { EcommerceService } from './ecommerce.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartItems = new BehaviorSubject<CartItem[]>([]);
  private baseUrl = 'http://localhost:5215/api/Ecommerce'; 
  private currentUser: User | null = null; // Adicionado para armazenar o usuário atual

  constructor(private http: HttpClient, private ecommerceService: EcommerceService) {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
        this.currentUser = JSON.parse(currentUserString);
        if (this.currentUser) {
            this.fetchCartItemsFromServer(this.currentUser.id).subscribe();
        }
    }
}

  get cartItems() {
    return this._cartItems.asObservable();
  }

  getCurrentCartItemsValue(): CartItem[] {
    return this._cartItems.getValue();
  }

  addToCart(product: Product) {
    if (!this.currentUser) {
      console.error('User is not logged in');
      return;
    }
  
    console.log('UserId:', this.currentUser.id);
    const cartItems = this.getCurrentCartItemsValue();
    const itemIndex = cartItems.findIndex(i => i.productId === product.id);
  
    if (itemIndex > -1) {
      const updatedItem = {
        id: cartItems[itemIndex].id,
        productId: product.id,
        quantity: cartItems[itemIndex].quantity + 1,
        userId: this.currentUser.id,
        nomeProduto: product.nomeProduto, // Corrigido para nomeProduto
      };
  
      this.ecommerceService.updateCartItem(updatedItem).pipe(
        catchError(error => {
          console.error('Error updating cart item:', error);
          return of(null);
        })
      ).subscribe(updatedItem => {
        if (updatedItem) {
          cartItems[itemIndex] = updatedItem;
          this._cartItems.next(cartItems);
        }
      });
    } else {
      const newItem = {
        productId: product.id,
        quantity: 1,
        userId: this.currentUser.id,
        nomeProduto: product.nomeProduto, // Corrigido para nomeProduto
      };
      
      this.ecommerceService.addProductToCart(newItem).pipe(
        catchError(error => {
          console.error('Error adding product to cart:', error);
          return of(null);
        })
      ).subscribe(newItem => {
        if (newItem) {
          this._cartItems.next([...cartItems, newItem]);
        }
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


