import { Component, OnInit } from '@angular/core';
import { EcommerceService } from '../../services/ecommerce.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {
  categories: any[] = [
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
  ];
  
  products: Product[] = []; // para armazenar todos os produtos
  filteredProducts: Product[] = []; // para armazenar os produtos da categoria selecionada
  selectedCategoryId: number | null = null;

  constructor(private ecommerceService: EcommerceService) {}

  ngOnInit(): void {
    // pegar a lista de produtos quando o componente for inicializado
    this.ecommerceService.getProductList().subscribe(
      products => {
        this.products = products;
        this.filterProductsByCategory(this.categories[0].name); // filtrar produtos da primeira categoria por padrão
      }
    );
  }

  selectCategory(categoryId: number, categoryName: string): void {
    this.selectedCategoryId = categoryId;
    this.filterProductsByCategory(categoryName);
  }

  filterProductsByCategory(categoryName: string): void {
    this.filteredProducts = this.products.filter(product => String(product.categoria).toLowerCase() === categoryName.toLowerCase());
  }
  
  
  
}


