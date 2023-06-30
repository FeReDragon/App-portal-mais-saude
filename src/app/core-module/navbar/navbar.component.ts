import { Component } from '@angular/core';
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

login(): void {
// Lógica de autenticação
}

toggleTheme(): void {
this.isDarkTheme = !this.isDarkTheme;
}

constructor(public themeService: ThemeService) {
// Construtor do componente
}
}


