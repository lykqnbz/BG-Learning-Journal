import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ThemeService {
  private themeKey = 'is-custom-dark-theme';
  private isDarkTheme: BehaviorSubject<boolean>;

  constructor() {
    const useDarkTheme = localStorage.getItem(this.themeKey)
      ? localStorage.getItem(this.themeKey) === 'true'
      : true;
    this.isDarkTheme = new BehaviorSubject<boolean>(useDarkTheme);
    localStorage.setItem(this.themeKey, this.isDarkTheme.value.toString());
  }
}
