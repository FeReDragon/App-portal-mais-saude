import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
onSubmit(_t7: NgForm) {
throw new Error('Method not implemented.');
}
goToSignin() {
throw new Error('Method not implemented.');
}
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthenticationService) {}

  login(): void {
    if (this.authService.login(this.username, this.password)) {
      // Login bem-sucedido, redirecionar para a página principal ou outra rota desejada
      // Exemplo: this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Credenciais inválidas. Por favor, tente novamente.';
    }
  }
}

