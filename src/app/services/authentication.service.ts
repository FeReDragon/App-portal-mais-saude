import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  login(username: string, password: string): boolean {
    const userDataString = localStorage.getItem('userData');
    
    if (!userDataString) {
      return false;
    }

    const userData = JSON.parse(userDataString);

    if (userData && userData.username === username && userData.password === password) {
      return true;
    } else {
      return false;
    }
  }

  register(userData: any): boolean {
    const existingUserString = localStorage.getItem('userData');

    if (existingUserString) {
      return false;
    }

    localStorage.setItem('userData', JSON.stringify(userData));
    return true;
  }

  logout(): void {
    localStorage.removeItem('userData');
  }
}

