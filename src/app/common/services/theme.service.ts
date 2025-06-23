import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly THEME_KEY = 'appKit_ecommerce/themePreference';
  isDarkTheme = signal(false);

  constructor() {
    // Load theme preference
    const savedPreference = localStorage.getItem(this.THEME_KEY);
    if (savedPreference !== null) {
      this.isDarkTheme.set(JSON.parse(savedPreference));
    }

    // Effect to manage signals
    effect(() => {
      this.applyTheme();
      this.saveThemePreference();
    });
  }
  
  toggleTheme(): void {
    this.isDarkTheme.set(!this.isDarkTheme());
    this.applyTheme();
  }
  
  isDarkMode(): boolean {
    return this.isDarkTheme();
  }

  private applyTheme(): void{
    const body = document.body;
    if (this.isDarkTheme()) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }

  private saveThemePreference(): void {
    localStorage.setItem(this.THEME_KEY, JSON.stringify(this.isDarkTheme()));
  }
}