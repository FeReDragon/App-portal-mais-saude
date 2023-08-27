export interface Product {
  id: number;
  url: string;
  nomeProduto: string;
  preco: number;
  descricao: string;
  categoria: number; // assumindo que categoria é um ID (número)
  categoriaNome: string; // novo campo para o nome da categoria
}


  