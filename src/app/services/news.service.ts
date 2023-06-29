import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }

  getNewsList(): any[] {
    return [
      { id: 1, title: 'Hello World', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut.' },
      { id: 2, title: 'Hello World', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { id: 3, title: 'Hello World', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      // Adicione mais notícias aqui conforme necessário
    ];
  }
}

