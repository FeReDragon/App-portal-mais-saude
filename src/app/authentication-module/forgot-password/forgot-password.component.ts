import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';  
  isError: boolean = false;  

  constructor(private authService: AuthenticationService) {}

  forgotPassword(form: NgForm) {
    this.isError = false;
    this.message = '';
  
    this.authService.forgotPassword(this.email).subscribe({
      next: response => {
        this.message = response; 
        this.email = ''; 
        form.resetForm(); 
      },
      error: error => {
        this.isError = true;
        this.message = error.error.error || error.message || 'Houve um erro ao processar sua solicitação. Por favor, tente novamente.';
        console.error('Error:', error);
      }
    });
  }
}  