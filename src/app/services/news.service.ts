import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }

  // Exemplo de método para obter a lista de notícias
  getNewsList(): any[] {
    // Implementação para buscar a lista de notícias do servidor ou de um arquivo de dados
    // Retorna a lista de notícias
    return [
      { id: 1, title: 'Notícia 1', content: 'Conteúdo da notícia 1' },
      { id: 2, title: 'Notícia 2', content: 'Conteúdo da notícia 2' },
      { id: 3, title: 'Notícia 3', content: 'Conteúdo da notícia 3' },
      // ...
    ];
  }

  // Exemplo de método para obter os detalhes de uma notícia
  getNewsDetails(newsId: number): any {
    // Implementação para buscar os detalhes da notícia com o ID fornecido do servidor ou de um arquivo de dados
    // Retorna os detalhes da notícia ou null se não encontrada
    // Exemplo de retorno:
    return {
      id: newsId,
      title: 'Notícia ' + newsId,
      content: 'Conteúdo da notícia ' + newsId,
      // ...
    };
  }

  // Exemplo de método para obter as categorias de notícias
  getNewsCategories(): string[] {
    // Implementação para buscar as categorias de notícias do servidor ou de um arquivo de dados
    // Retorna a lista de categorias
    return ['Esportes', 'Política', 'Entretenimento', 'Tecnologia', 'Saúde', 'Economia'];
  }

  // Exemplo de método para obter as notícias de uma determinada categoria
  getNewsByCategory(category: string): any[] {
    // Implementação para buscar as notícias da categoria fornecida do servidor ou de um arquivo de dados
    // Retorna a lista de notícias da categoria
    // Exemplo de retorno:
    return [
      { id: 1, title: 'Notícia 1', content: 'Conteúdo da notícia 1', category: category },
      { id: 2, title: 'Notícia 2', content: 'Conteúdo da notícia 2', category: category },
      // ...
    ];
  }

}
