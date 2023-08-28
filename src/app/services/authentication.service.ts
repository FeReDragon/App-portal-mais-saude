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
  private currentUser: User | null;

  constructor(private http: HttpClient) {
    const currentUserString = localStorage.getItem('currentUser');
    this.currentUser = currentUserString ? JSON.parse(currentUserString) : null;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.name === username && u.password === password);
        if (user !== undefined) {
          this.currentUser = user;
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => {
        return throwError('Credenciais inválidas. Por favor, tente novamente.');
      })
    );
  }


register(userData: Omit<User, 'id'>): Observable<boolean> {
  return this.http.post<User>(this.apiUrl, userData).pipe(
    map((response: User) => {
      this.currentUser = {
        id: response.id,
        username: response.username,  // adiciona isto
        name: response.name,
        password: response.password,
        birthday: response.birthday,
        email: response.email
      };
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

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}

export { User };
