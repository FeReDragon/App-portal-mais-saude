import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:5215/auth';
  private currentUserSubject: BehaviorSubject<User | null>;
  currentUser: User | null;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString !== null) {
      this.currentUserSubject.next(JSON.parse(currentUserString));
      console.log('Usuário encontrado no local storage:', JSON.parse(currentUserString));
    }
    this.currentUser = this.getCurrentUser();
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      map(response => {
        console.log("Resposta HTTP para login:", response);
  
        if (response && response.token) {
          this.currentUser = {
            id: response.id,
            username: response.username,
            name: response.name,
            password: '',
            email: response.email,
            birthday: new Date(response.birthday)
          };
  
          console.log("currentUser após login:", this.currentUser);
  
          // Atualiza o currentUserSubject com o novo estado do usuário
          this.currentUserSubject.next(this.currentUser);
  
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          localStorage.setItem('token', response.token);
          return true;
        }
        return false;
      }),
      catchError(() => {
        return throwError('Credenciais inválidas. Por favor, tente novamente.');
      })
    );
  }
  public getCurrentUserObservable(): Observable<User | null> {
  return this.currentUserSubject.asObservable();
}


  public register(userData: Omit<User, 'id'>): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData)
      .pipe(
        map(response => {
          console.log('Resposta da API ao registrar:', response);
          if (response && response.token) {
            const user: User = {
              id: response.id,
              username: response.username,
              name: response.name,
              password: '',
              email: response.email,
              birthday: new Date(response.birthday)
            };
            console.log('Usuário transformado ao registrar:', user);
            this.currentUserSubject.next(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            console.log('Usuário armazenado no local storage ao registrar:', JSON.parse(localStorage.getItem('currentUser') || '{}'));
            localStorage.setItem('token', response.token);
            return true;
          }
          return false;
        }),
        catchError((error: any) => {
          console.error('Erro ao registrar usuário:', error);
          return throwError('Erro ao registrar usuário. Por favor, tente novamente.');
        })
      );
  }

  public getCurrentUser(): User | null {
    const currentUser = this.currentUserSubject.getValue();
    console.log('Obtendo usuário atual:', currentUser);
    return currentUser;
  }

  public logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  public isAuthenticated(): boolean {
    const currentUser = this.currentUserSubject.getValue();
    return !!currentUser;
  }
}


export { User };

