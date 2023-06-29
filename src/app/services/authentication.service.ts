import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  // Exemplo de método de autenticação
  login(username: string, password: string): boolean {
    // Implementação da lógica de autenticação aqui
    // Por exemplo, verificar se as credenciais estão corretas no servidor
    // e retornar true ou false com base no resultado da autenticação

    if (username === 'admin' && password === 'admin') {
      // Credenciais corretas, usuário autenticado
      return true;
    } else {
      // Credenciais incorretas, usuário não autenticado
      return false;
    }
  }

}

