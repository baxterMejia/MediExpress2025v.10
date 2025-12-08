import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './core/auth.guard';
import { DashboardComponent } from './usuario/dashboard/dashboard.component';
import { NuevaSolicitudComponent } from './usuario/nueva-solicitud/nueva-solicitud.component';
import { MiPerfilComponent } from './usuario/mi-perfil/mi-perfil.component';
import { HistoricoEntregasComponent } from './usuario/historico-entregas/historico-entregas.component';
import { NotificacionesComponent } from './usuario/notificaciones/notificaciones.component';
import { InventarioComponent } from './operador/inventario/inventario.component';
import { EntregasComponent } from './operador/entregas/entregas.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'perfil',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'nueva-solicitud',
    component: NuevaSolicitudComponent,
    canActivate: [authGuard]
  },
  {
    path: 'mi-perfil',
    component: MiPerfilComponent,
    canActivate: [authGuard]
  },
  {
    path: 'historico-entregas',
    component: HistoricoEntregasComponent,
    canActivate: [authGuard]
  },
  {
    path: 'notificaciones',
    component: NotificacionesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'inventario',
    component: InventarioComponent,
    canActivate: [authGuard]
  },
  {
    path: 'entregas',
    component: EntregasComponent,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/login' }
];
