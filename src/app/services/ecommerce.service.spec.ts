import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../ecommerce-module/model/product.model'; // Import the Product model

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  constructor() { }

  getProducts(): Observable<Product[]> {
    // Replace this with actual implementation to fetch products.
    // This is just a mock implementation returning an empty array.
    return of([]);
  }
}

