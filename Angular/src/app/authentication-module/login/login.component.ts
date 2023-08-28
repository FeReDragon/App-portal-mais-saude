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
    private router: Router
  ) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (authenticated: boolean) => {
        if (authenticated) {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Credenciais inválidas. Por favor, tente novamente.';
        }
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );
  }
}






