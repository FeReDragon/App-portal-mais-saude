import { User } from "./IUsuario";

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
  productId: number;
  quantity: number;
  userId: number;
  nomeProduto: string;
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


export { User };

