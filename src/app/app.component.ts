import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  ],
  template: `
    <ng-container *ngIf="auth.isLoggedIn()">
      <div class="flex min-h-screen bg-background text-foreground">
        <app-sidebar
          [open]="sidebarOpen"
          class="shadow-lg"
        ></app-sidebar>

        <div class="flex flex-col flex-1">
          <app-navbar
            (toggleSidebar)="toggleSidebar()"
            class="shadow"
          ></app-navbar>

          <main class="flex-1 p-6">
            <router-outlet></router-outlet>
          </main>

          <app-footer></app-footer>
        </div>
      </div>
    </ng-container>

    <ng-container *ngIf="!auth.isLoggedIn()">
      <router-outlet></router-outlet>
    </ng-container>
  `
})
export class AppComponent {
  sidebarOpen = true;

  constructor(public auth: AuthService) {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
