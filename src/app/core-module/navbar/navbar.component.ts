import { Component } from '@angular/core';
import { AuthenticationService, User } from '../../services/authentication.service';
import { ThemeService } from '../../services/theme.service';
import { CartService } from '../../services/cart.service';

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
  totalItemsInCart: number = 0;
  currentUser: User | null = null;

  constructor(
    public themeService: ThemeService,
    public authService: AuthenticationService,
    private cartService: CartService
  ) {
    this.cartService.cartItems.subscribe(items => {
      this.totalItemsInCart = items.reduce((total, item) => total + item.quantity, 0);
      this.currentUser = this.authService.getCurrentUser();
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (authenticated) => {
        if (authenticated) {
          this.username = '';
          this.password = '';
        } else {
          alert('Credenciais inválidas. Por favor, tente novamente.');
        }
      },
      (error: any) => {
        console.error('Erro durante o login:', error);
        alert('Erro durante o login. Por favor, tente novamente.');
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }
}







