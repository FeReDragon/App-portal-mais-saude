import { Component, OnInit } from '@angular/core';
import { EcommerceService } from '../../services/ecommerce.service';
import { Product, Category } from '../../interfaces/IEcommerce';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {
  categories: Category[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategoryId: number | null = null;

  constructor(private ecommerceService: EcommerceService) {}

  ngOnInit(): void {
    this.ecommerceService.getCategories().subscribe(
      categories => {
        this.categories = categories;
        // Continua a lógica para carregar os produtos
        this.ecommerceService.getProductList().subscribe(
          products => {
            this.products = products;
            // Aqui você pode selecionar a primeira categoria ou usar outra lógica
            if (this.categories.length > 0) {
              // Agora, estamos utilizando o ID da categoria para filtrar os produtos
              this.filterProductsByCategory(this.categories[0].id);
            }
          }
        );
      }
    );
  }

  // Alterando o tipo do parâmetro para number, que é o tipo do ID da categoria
  filterProductsByCategory(categoryId: number) {
    // Alterando a lógica de filtragem para utilizar o ID da categoria
    this.filteredProducts = this.products.filter(product => product.categoryId === categoryId);
  }
}

