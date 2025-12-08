import { Injectable } from '@angular/core';

export type Theme = 'default' | 'dark' | 'green' | 'red' | 'slate';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private storageKey = 'app-theme';

  constructor() {
    const saved = (localStorage.getItem(this.storageKey) as Theme) || 'default';
    this.setTheme(saved);
  }

  setTheme(theme: Theme) {
    const doc = document.documentElement;
    // elimina cualquier clase de tema previa
    doc.classList.remove('theme-default','theme-dark','theme-green','theme-red','theme-slate');
    // añade la del nuevo tema
    doc.classList.add(`theme-${theme}`);
    localStorage.setItem(this.storageKey, theme);
  }

  getTheme(): Theme {
    return (localStorage.getItem(this.storageKey) as Theme) || 'default';
  }
}
