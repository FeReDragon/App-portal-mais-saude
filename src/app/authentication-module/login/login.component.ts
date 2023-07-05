// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router // Importe o Router para poder redirecionar o usuário
  ) {}

  login(): void {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/home']); // Redireciona o usuário para a home
    } else {
      this.errorMessage = 'Credenciais inválidas. Por favor, tente novamente.';
    }
  }
}


