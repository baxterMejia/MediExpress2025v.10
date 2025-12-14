import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css'],
})
export class MiPerfilComponent {
  editando = false;
  guardando = false;
  confirmationMessage: string | null = null;

  rol = this.authService.getUserRole();
  perfil =
    this.rol === 'operador'
      ? {
          nombre: 'Farmacia Express S.A.S',
          documento: '900123456-7',
          email: 'contacto@farmaciaexpress.com',
          telefono: '601 555 1234',
          direccion: 'Cra 45 #67-89',
          ciudad: 'Bogotá',
          eps: 'N/A',
          numeroEps: 'N/A',
        }
      : {
          nombre: 'Juan Pérez',
          email: 'usuario@mediexpress.com',
          telefono: '300 123 4567',
          documento: '1234567890',
          direccion: 'Calle 123 #45-67',
          ciudad: 'Bogotá',
          eps: 'Salud Total',
          numeroEps: 'ST123456789',
        };

  perfilOriginal = { ...this.perfil };

  constructor(private authService: AuthService) {}

  activarEdicion() {
    this.editando = true;
    this.perfilOriginal = { ...this.perfil };
  }

  cancelarEdicion() {
    this.editando = false;
    this.perfil = { ...this.perfilOriginal };
  }

  guardarCambios() {
    this.guardando = true;
    // Simular guardado
    setTimeout(() => {
      this.guardando = false;
      this.editando = false;
      this.perfilOriginal = { ...this.perfil };
    }, 1000);
    this.showConfirmation('Perfil actualizado con éxito', 3000);
  }

  showConfirmation(message: string, duration = 3000) {
    this.confirmationMessage = message;
    setTimeout(() => (this.confirmationMessage = null), duration);
  }
}
