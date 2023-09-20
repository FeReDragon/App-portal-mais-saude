import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News, UserComment } from '../interfaces/INews';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private baseUrl = 'http://localhost:5215/api'; // Atualizado para o servidor ASP.NET Core

  constructor(private http: HttpClient) { }

  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.baseUrl}/News`);  // Atualizado endpoint
  }

  getNewsById(id: number): Observable<News> {
    return this.http.get<News>(`${this.baseUrl}/getNewsById/${id}`);  // Atualizado endpoint
  }

  getUserCommentsForNews(newsId: number): Observable<UserComment[]> {
    return this.http.get<UserComment[]>(`${this.baseUrl}/getUserComments/${newsId}`);  // Atualizado endpoint
  }

  addComment(comment: Partial<UserComment>): Observable<UserComment> {
    return this.http.post<UserComment>(`${this.baseUrl}/addComment`, comment);  // Atualizado endpoint
  }  
}
