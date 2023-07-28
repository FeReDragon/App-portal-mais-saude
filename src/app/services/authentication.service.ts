import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Importe throwError aqui
import { catchError, map, tap } from 'rxjs/operators'; // Importe o catchError aqui
import { User } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => users.find(user => user.name === username && user.password === password) !== undefined),
      tap((authenticated: boolean) => {
        if (authenticated) {
          localStorage.setItem('currentUser', JSON.stringify({ username }));
        }
      }),
      catchError(error => { // Adicione o bloco catchError para tratamento de erros
        return throwError('Credenciais inválidas. Por favor, tente novamente.');
      })
    );
  }
  
  register(userData: any): Observable<boolean> {
    return this.http.post<any>('http://localhost:3000/users', userData).pipe(
      map(response => {
        this.saveUsers([...this.getUsers(), response]);
        localStorage.setItem('currentUser', JSON.stringify(response));
        return true;
      }),
      catchError(error => {
        console.error('Erro ao registrar usuário:', error);
        return throwError('Erro ao registrar usuário. Por favor, tente novamente.');
      })
    );
  }
  
  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  private getUsers(): any[] {
    const usersString = localStorage.getItem('userData');
    return usersString ? JSON.parse(usersString) : [];
  }

  private saveUsers(users: any[]): void {
    localStorage.setItem('userData', JSON.stringify(users));
  }
}
