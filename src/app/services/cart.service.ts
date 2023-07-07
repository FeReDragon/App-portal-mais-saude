// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { Product } from '../ecommerce-module/model/product.model';

// export interface CartItem {
//   product: Product;
//   quantity: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   removeItem(item: CartItem) {
//     throw new Error('Method not implemented.');
//   }
//   private _cartItems = new BehaviorSubject<CartItem[]>([]);

//   constructor() { }

//   get cartItems() {
//     return this._cartItems.asObservable();
//   }

//   addToCart(product: Product) {
//     const item = this._cartItems.getValue().find(i => i.product.id === product.id);

//     if (item) {
//       this.updateCartQuantity(item, item.quantity + 1);
//     } else {
//       this._cartItems.next([...this._cartItems.getValue(), 
//       { 
//         product: { 
//           id: product.id, 
//           nome: product.name, 
//           description: product.description, 
//           price: product.price,
//           image: product.image // image property added to the product object
//         },
//         quantity: 1 
//       }]);
//     }
//   }

//   updateCartQuantity(item: CartItem, quantity: number) {
//     const cartItems = this._cartItems.getValue();
//     const index = cartItems.findIndex(i => i.product.id === item.product.id);
    
//     if(index > -1) {
//       cartItems[index].quantity = quantity;
//       this._cartItems.next(cartItems);
//     }
//   }
// }
