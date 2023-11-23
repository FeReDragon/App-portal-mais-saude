import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CartItem, CartService } from '../../services/cart.service';
import { Product, EcommerceService } from '../../services/ecommerce.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  products: Product[] = []; // Supondo que você tem um array de produtos
  totalItems = 0;
  totalPrice = 0;
  loading = true;

  constructor(
    private cartService: CartService,
    private ecommerceService: EcommerceService // Injetando EcommerceService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems.subscribe((cartItems: CartItem[]) => {
      this.items = cartItems;
  
      // Se o carrinho estiver vazio, atualize o estado de carregamento e retorne
      if (this.items.length === 0) {
        this.loading = false;
        return;
      }
  
      // Buscando detalhes dos produtos
      const productObservables = cartItems.map(item => this.ecommerceService.getProductDetails(item.productId));
      forkJoin(productObservables).subscribe(products => {
        this.products = products;
        this.calculateTotal();
        this.loading = false; // Atualiza o estado de carregamento após carregar os produtos
      });
    });
  }
  

  removeFromCart(item: CartItem) {
    this.cartService.removeItem(item);
  }

  calculateTotal() {
    this.totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
    this.totalPrice = this.products.reduce((total, product, index) => total + (product.preco * this.items[index].quantity), 0);
  }

  checkout() {
    // Implemente sua lógica de finalização de compra aqui
  }
}



