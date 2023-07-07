import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  login(username: string, password: string): boolean {
    const users = this.getUsers();
    const authenticatedUser = users.find(user => user.username === username && user.password === password);
  
    if (authenticatedUser) {
      localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
      return true;
    }
  
    return false;
  }
  
  register(userData: any): boolean {
    const users = this.getUsers();
    const existingUser = users.find(user => user.name === userData.name);
  
    if (existingUser) {
      // User already exists
      return false;
    }
  
    users.push(userData);
    this.saveUsers(users);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    return true;
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

