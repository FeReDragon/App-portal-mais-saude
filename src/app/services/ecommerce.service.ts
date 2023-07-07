import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../ecommerce-module/model/product.model';

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

  addToCart(productId: number): Observable<any> {
    return this.http.post<any>('http://localhost:3000/cart', { productId });
  }

  checkout(): Observable<any> {
    return this.http.post<any>('http://localhost:3000/checkout', {});
  }

  getProductsByCategory(categoryName: string): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/products?categoria=${categoryName}`);
  }
}




