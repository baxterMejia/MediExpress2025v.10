import { Component, EventEmitter, Output } from '@angular/core';
import { IconsModule } from '../layout.module';
import { ThemeService, Theme } from '../../core/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IconsModule , CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  themes: Theme[] = ['default','dark','green','red','slate'];
  // Mapeo de colores representativos para el dropdown
  themeColors: Record<Theme,string> = {
    default: '#2C3E50',
    dark:    '#1A1A1D',
    green:   '#046307',
    red:     '#4B0E13',
    slate:   '#2F4F4F'
  };

  dropdownOpen = false;
  current = this.themeService.getTheme();

  constructor(private themeService: ThemeService, private auth: AuthService, private router: Router) {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectTheme(t: Theme) {
    this.themeService.setTheme(t);
    this.current = t;
    this.dropdownOpen = false;
  }


  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
