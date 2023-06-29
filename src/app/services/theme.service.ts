import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkThemeValue = false;

  toggleTheme(): void {
    this.darkThemeValue = !this.darkThemeValue;
    const body = document.getElementsByTagName('body')[0];
    if (this.darkThemeValue) {
      body.classList.remove('bg-light');
      body.classList.add('bg-dark');
    } else {
      body.classList.remove('bg-dark');
      body.classList.add('bg-light');
    }
  }

  isDarkTheme(): boolean {
    return this.darkThemeValue;
  }
}