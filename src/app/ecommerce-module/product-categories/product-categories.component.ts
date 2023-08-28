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
      icon: 'fa fa-capsules',
      description: 'Vitaminas, minerais, suplementos esportivos, ervas medicinais, produtos para perda de peso, suplementos para energia, E MUITO MAIS',
    },
    {
      id: 2,
      name: 'Produtos de cuidados pessoais',
      icon: 'fa fa-bath',
      description: 'Cosméticos naturais, produtos de higiene pessoal, cremes hidratantes, produtos para cuidados com a pele, produtos para cabelo, entre outros.',
    },
    {
      id: 3,
      name: 'Equipamentos e dispositivos para saúde',
      icon: 'fa fa-heartbeat',
      description: 'Aparelhos de pressão arterial, medidores de glicemia, oxímetros de pulso, termômetros, produtos de monitoramento da saúde, entre outros.',
    },
    {
      id: 4,
      name: 'Equipamentos de fitness',
      icon: 'fa fa-dumbbell',
      description: 'Esteiras, bicicletas ergométricas, elípticos, pesos, bolas de exercício, equipamentos de treinamento funcional, entre outros.',
    },
    {
      id: 5,
      name: 'Produtos naturais e orgânicos',
      icon: 'fa fa-leaf',
      description: 'Alimentos saudáveis, bebidas nutritivas, snacks naturais, produtos orgânicos certificados, alimentos sem glúten ou lactose, entre outros.',
    },
    {
      id: 6,
      name: 'Produtos para sono e relaxamento',
      icon: 'fa fa-bed',
      description: 'Travesseiros ergonômicos, colchões especiais, máscaras de dormir, cobertores ponderados, produtos de terapia do sono, entre outros.',
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
        this.products = products.map(product => {
          const category = this.categories.find(cat => cat.id === product.categoria);
          if (category) {
            product.categoriaNome = category.name;
          }
          return product;
        });
        this.filterProductsByCategory(this.categories[0].name); // filtrar produtos da primeira categoria por padrão
      }
    );
  }

  // Adicione esta função
  filterProductsByCategory(categoryName: string) {
    this.filteredProducts = this.products.filter(product => product.categoriaNome === categoryName);
  }
  getCategoryIconClass(category: any): string {
    return category.icon;
  }
  
  
}

