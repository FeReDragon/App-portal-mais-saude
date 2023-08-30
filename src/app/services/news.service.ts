import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News, UserComment } from '../interfaces/INews';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private baseUrl = 'http://localhost:3000'; // URL base do JSON Server

  constructor(private http: HttpClient) { }

  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.baseUrl}/news`);
  }

  getNewsById(id: number): Observable<News> {
    return this.http.get<News>(`${this.baseUrl}/news/${id}`);
  }

  getUserCommentsForNews(newsId: number): Observable<UserComment[]> {
    return this.http.get<UserComment[]>(`${this.baseUrl}/comments?newsId=${newsId}`);
  }

  addComment(comment: Partial<UserComment>): Observable<UserComment> {
    return this.http.post<UserComment>(`${this.baseUrl}/comments`, comment);
  }  
}



