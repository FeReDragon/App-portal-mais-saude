import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // Adicione 'of' para simular um Observable
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

  // Método para buscar categorias
  getCategories(): Observable<any[]> {
    // Se você possui uma API para buscar categorias, utilize o método abaixo
    // return this.http.get<any[]>('http://localhost:3000/categories');

    // Ou, se as categorias são estáticas e já conhecidas, você pode retorná-las diretamente
    return of([
      {
        id: 1,
        name: 'Suplementos nutricionais',
        description: 'Vitaminas, minerais, suplementos esportivos, ervas medicinais, produtos para perda de peso, suplementos para energia, E MUITO MAIS',
        image: 'https://i1.wp.com/abcblogs.abc.es/eat-fit/wp-content/uploads/sites/201/2015/07/tipos-proteinas-optimum.jpg'
      },
      {
        id: 2,
        name: 'Produtos de cuidados pessoais',
        description: 'Cosméticos naturais, produtos de higiene pessoal, cremes hidratantes, produtos para cuidados com a pele, produtos para cabelo, entre outros.',
        image: 'https://cdn.shopify.com/s/files/1/0410/9608/5665/t/3/assets/pf-d338f57a--Blog-Creative-24.jpg?v=1607934389'
      },
      {
        id: 3,
        name: 'Equipamentos e dispositivos para saúde',
        description: 'Aparelhos de pressão arterial, medidores de glicemia, oxímetros de pulso, termômetros, produtos de monitoramento da saúde, entre outros.',
        image: 'https://1.bp.blogspot.com/-yAgkQKT2hT4/YIMGZjSABAI/AAAAAAAABkY/0fCXuErronYRI8h__w22556mxjlcms6AgCLcBGAsYHQ/s2048/0001-261027506_20210423_230555_0000.png'
      },
      {
        id: 4,
        name: 'Equipamentos de fitness',
        description: 'Esteiras, bicicletas ergométricas, elípticos, pesos, bolas de exercício, equipamentos de treinamento funcional, entre outros.',
        image: 'https://franchiseindia.s3.ap-south-1.amazonaws.com/uploads/content/wi/art/1200-grokker-hiit-workout-972c0071bc.jpg'
      },
      {
        id: 5,
        name: 'Produtos naturais e orgânicos',
        description: 'Alimentos saudáveis, bebidas nutritivas, snacks naturais, produtos orgânicos certificados, alimentos sem glúten ou lactose, entre outros.',
        image: 'https://londonallergy.com/wp-content/uploads/2020/11/iStock-179751167-scaled.jpg'
      },
      {
        id: 6,
        name: 'Produtos para sono e relaxamento',
        description: 'Travesseiros ergonômicos, colchões especiais, máscaras de dormir, cobertores ponderados, produtos de terapia do sono, entre outros.',
        image: 'https://avatars.mds.yandex.net/i?id=51a9faef902ae9b1c01ec180ed01102c20f2e3d4-9222271-images-thumbs&ref=rim&n=33&w=225&h=150'
      }
      // ... outras categorias aqui
    ]);
  }
}

