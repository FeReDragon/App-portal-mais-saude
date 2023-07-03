import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModalComponent } from './modal/modal.component';
import { RouterModule } from '@angular/router';
import { PublicComponentComponent } from './components/public-component/public-component.component';
import { PrivateComponentComponent } from './components/private-component/private-component.component';




@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    DropdownComponent,
    ModalComponent,
    PublicComponentComponent,
    PrivateComponentComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModuleModule { }
