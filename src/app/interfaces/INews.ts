export interface News {
    id: number;
    titulo: string;
    conteudo: string;
    url: string; 
    categoryId?: number; 
  }

  export interface UserComment {
    id: number;
    userId: number;
    newsId: number; // Vincula o comentário à notícia
    comment: string;
  }