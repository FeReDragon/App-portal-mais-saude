export interface Product {
  id: number;
  url: string;
  nomeProduto: string;
  preco: number;
  descricao: string;
  categoryId: number; // Alterado de Category para categoryId
}


export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  userId: number;
}

export interface Order {
  id?: number;
  userId: number;
  items: OrderItem[];
  total: number;
  orderDate?: Date;
  status?: string;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface Category {
  id: number;
  categoriaNome: string;
  descricao: string;
}


