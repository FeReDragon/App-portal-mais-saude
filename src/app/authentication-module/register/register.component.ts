import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';


export function minAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const controlDate = new Date(control.value);
    const today = new Date();

    const difference = today.getFullYear() - controlDate.getFullYear();

    if (difference < minAge || (difference === minAge && today.getMonth() < controlDate.getMonth()) || (difference === minAge && today.getMonth() === controlDate.getMonth() && today.getDate() < controlDate.getDate())) {
      return { ageInvalid: true };
    }

    return null;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    birthday: ['', [Validators.required, minAgeValidator(18)]],
    terms: [false, Validators.requiredTrue]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      // Remove a confirmação de senha do objeto de dados do usuário, pois ela não é necessária para o registro
      delete userData.confirmPassword;

      // Chame o método de registro do serviço de autenticação
      const isRegistered = this.authService.register(userData);

      if (isRegistered) {
        // O registro foi bem-sucedido
        console.log('Registro bem-sucedido');
      } else {
        // O registro falhou
        console.log('Registro falhou');
      }
    }
  }
}


