import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Importe 'of' do pacote 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {
  // ...

  getProductList(): Observable<any[]> {
    return of([
      { id: 1, name: 'Produto 1', price: 10 },
      { id: 2, name: 'Produto 2', price: 20 },
      { id: 3, name: 'Produto 3', price: 30 },
      // ...
    ]);
  }

  getProductDetails(productId: number): Observable<any> {
    return of({
      id: productId,
      name: 'Produto ' + productId,
      price: 20,
      description: 'Descrição do produto ' + productId,
      // ...
    });
  }
  addToCart(productId: number): void {
    // Implementação para adicionar o item com o ID fornecido ao carrinho
  }

  getCart(): Observable<any[]> {
    return of([
      { id: 1, name: 'Produto 1', price: 10, quantity: 2 },
      { id: 2, name: 'Produto 2', price: 20, quantity: 1 },
      // ...
    ]);
  }

  removeCartItem(productId: number): void {
    // Implementação para remover o item com o ID fornecido do carrinho
  }

  checkout(): void {
    // Implementação para processar o checkout do carrinho
  }
}
