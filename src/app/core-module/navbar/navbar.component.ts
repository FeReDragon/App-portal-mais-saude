import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [ThemeService]
})
export class NavbarComponent {
  username: string = '';
  password: string = '';
  isDarkTheme = false;
  errorMessage: string = '';


  // Tornar authService pública
  constructor(
    public themeService: ThemeService,
    public authService: AuthenticationService
  ) {
    // Construtor do componente
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  login(): void {
    // Implemente a lógica de login aqui
    // Por exemplo, pode chamar o serviço de autenticação
    this.authService.login(this.username, this.password).subscribe(
      (authenticated) => {
        if (authenticated) {
          // Limpar campos de login após o login bem-sucedido
          this.username = '';
          this.password = '';
        } else {
          // Tratar erro de login
          alert('Credenciais inválidas. Por favor, tente novamente.');
        }
      },
      (error) => {
        console.error('Erro durante o login:', error);
        alert('Erro durante o login. Por favor, tente novamente.');
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }
}






