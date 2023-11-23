import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = ''; // Mensagem para o usuário
  isError: boolean = false; // Flag para controle de erro

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    // Pegar o token do URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  resetPassword(form: NgForm) {
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'As senhas não coincidem. Tente novamente.';
      this.isError = true;
      return;
    }

    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: () => {
        this.message = 'Sua senha foi redefinida com sucesso.';
        this.isError = false;
        form.resetForm(); // Resetar o formulário inteiro
      },
      error: error => {
        this.message = error.error.message || 'Ocorreu um erro durante a redefinição da senha.';
        this.isError = true;
        console.error('Error:', error);
      }
    });
  }
}
