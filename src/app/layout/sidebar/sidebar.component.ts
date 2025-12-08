import { Component, Input, OnInit } from '@angular/core';
import { IconsModule } from '../layout.module';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    IconsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  animations: [
    trigger('slideInOut', [
      state('void', style({ width: '0px', opacity: 0 })),
      state('*', style({ width: '*', opacity: 1 })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  @Input() open = true;
  menuItems: MenuItem[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const role = this.authService.getUserRole();
    this.menuItems = this.getMenuByRole(role);
  }

  getMenuByRole(role: string | null): MenuItem[] {
    switch(role) {
      case 'usuario':
        return [
          { label: 'Dashboard', icon: 'Home', route: '/dashboard' },
          { label: 'Nueva Solicitud', icon: 'FilePlus', route: '/nueva-solicitud' },
          { label: 'Mi Perfil', icon: 'User', route: '/mi-perfil' },
          { label: 'Histórico', icon: 'Package', route: '/historico-entregas' },
          { label: 'Notificaciones', icon: 'Bell', route: '/notificaciones' }
        ];
      case 'operador':
        return [
          { label: 'Dashboard', icon: 'Home', route: '/dashboard' },
          { label: 'Entregas', icon: 'Package', route: '/entregas' },
          { label: 'Inventario', icon: 'Package', route: '/inventario' },
          { label: 'Mi Perfil', icon: 'User', route: '/mi-perfil' }
        ];
      case 'eps':
        return [
          { label: 'Dashboard', icon: 'Home', route: '/dashboard' },
          { label: 'Solicitudes', icon: 'FileText', route: '/solicitudes' },
          { label: 'Usuarios', icon: 'Users', route: '/usuarios' },
          { label: 'Mi Perfil', icon: 'User', route: '/mi-perfil' }
        ];
      default:
        return [
          { label: 'Dashboard', icon: 'Home', route: '/dashboard' }
        ];
    }
  }
}
