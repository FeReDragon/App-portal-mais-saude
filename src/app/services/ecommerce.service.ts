import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // Adicione 'of' para simular um Observable
import { Product, Category, Order } from '../interfaces/IEcommerce';
import { CartItem, CartService } from '../services/cart.service';


@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  constructor(private http: HttpClient) {}

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:5215/products');
  }

  getProductDetails(productId: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:5215/products/${productId}`);
  }

  addProductToCart(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>('http://localhost:5215/cartItems', cartItem);
  }

  updateCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(`http://localhost:5215/cartItems/${cartItem.id}`, cartItem);
  }

  deleteCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:5215/cartItems/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('http://localhost:5215/orders', order);
  }

  // Altere a assinatura do método getProductsByCategory para aceitar um número (categoryId)
getProductsByCategory(categoryId: number): Observable<Product[]> {
  // Atualize o URL para usar categoryId
  return this.http.get<Product[]>(`http://localhost:5215/products?categoryId=${categoryId}`);
}

// Se você tiver um tipo definido para Category, substitua any[] por Category[]
getCategories(): Observable<Category[]> {
  return this.http.get<Category[]>('http://localhost:5215/categorys');
}


}
