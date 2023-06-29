import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PrivacySettingsComponent } from './privacy-settings/privacy-settings.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    PrivacySettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AuthenticationModuleModule { }
