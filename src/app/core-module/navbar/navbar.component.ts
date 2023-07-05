import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';  // Certifique-se de que o caminho está correto
import { ThemeService } from '../../services/theme.service';

@Component({
selector: 'app-navbar',
templateUrl: './navbar.component.html',
styleUrls: ['./navbar.component.scss'],
providers: [ThemeService]
})
export class NavbarComponent {
username: string | undefined;
password: string | undefined;
isDarkTheme = false;

constructor(
  public themeService: ThemeService,
  private authService: AuthenticationService  // Injeção do serviço de autenticação
) {
  // Construtor do componente
}

login(): void {
  // Lógica de autenticação
}

logout(): void {  // Função de logout
  this.authService.logout();
}

toggleTheme(): void {
  this.isDarkTheme = !this.isDarkTheme;
}
}



