import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Usuário autenticado, permite o acesso à rota
    } else {
      this.router.navigate(['/login']); // Redireciona para a página de login
      return false; // Bloqueia o acesso à rota
    }
  }
}



