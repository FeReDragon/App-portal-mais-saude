import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000/users';
  private currentUser: any;

  constructor(private http: HttpClient) {
    const currentUserString = localStorage.getItem('currentUser');
    this.currentUser = currentUserString ? JSON.parse(currentUserString) : null;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => users.find(user => user.name === username && user.password === password) !== undefined),
      tap((authenticated: boolean) => {
        if (authenticated) {
          this.currentUser = { username };
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }
      }),
      catchError(() => {
        return throwError('Credenciais inválidas. Por favor, tente novamente.');
      })
    );
  }

  register(userData: any): Observable<boolean> {
    return this.http.post<any>('http://localhost:3000/users', userData).pipe(
      map(response => {
        this.currentUser = { username: userData.name }; // Assuming the user data has a 'name' property
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        return true;
      }),
      catchError(error => {
        console.error('Erro ao registrar usuário:', error);
        return throwError('Erro ao registrar usuário. Por favor, tente novamente.');
      })
    );
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }
}
