import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Product, Category, Order } from '../interfaces/IEcommerce';
import { CartItem } from '../services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {
  private baseUrl = 'https://webapi-hms.azurewebsites.net/api/Ecommerce';

  constructor(private http: HttpClient) {}

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/Products`);
  }

  getProductDetails(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${productId}`);
  }

 // No arquivo ecommerce.service.ts
 addProductToCart(cartItem: { id?: number, productId: number, quantity: number, userId: number }): Observable<CartItem> {
  console.log(cartItem); // log the request body
  return this.http.post<CartItem>(`${this.baseUrl}/cartItems`, cartItem)
    .pipe(
      catchError(error => {
        console.error('Error in addProductToCart:', error);
        console.error('Error Details:', error.error); // log the error object
        if (error.error && error.error.errors) {
          console.error('Validation Errors:', error.error.errors); // log the validation errors
        }
        return throwError(error);
      })
    );
}


  updateCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.baseUrl}/cartItems/${cartItem.id}`, cartItem);
  }

  deleteCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/cartItems/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/orders`, order);
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products?categoryId=${categoryId}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${productId}`);
  }
}
export { Product };

