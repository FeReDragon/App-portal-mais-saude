import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // Adicione 'of' para simular um Observable
import { Product, CartItem, Category, Order } from '../interfaces/IEcommerce';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  constructor(private http: HttpClient) {}

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  getProductDetails(productId: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/products/${productId}`);
  }

  addProductToCart(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>('http://localhost:3000/cartItems', cartItem);
  }

  updateCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(`http://localhost:3000/cartItems/${cartItem.id}`, cartItem);
  }

  deleteCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/cartItems/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('http://localhost:3000/orders', order);
  }

  getProductsByCategory(categoryName: string): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/products?categoria=${categoryName}`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/categories');
  }

}
