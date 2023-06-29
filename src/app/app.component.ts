import { Component } from '@angular/core';
import { navbarComponent } from './core-module/navbar/navbar.component';
import { footerComponent } from './core-module/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'App-portal-mais-saude';
}

