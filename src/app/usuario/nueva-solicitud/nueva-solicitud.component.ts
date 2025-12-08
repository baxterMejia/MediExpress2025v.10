import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nueva-solicitud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nueva-solicitud.component.html',
  styleUrls: ['./nueva-solicitud.component.css']
})
export class NuevaSolicitudComponent {
  solicitud = {
    medicamento: '',
    cantidad: 1,
    frecuencia: 'diaria',
    duracion: 30,
    observaciones: ''
  };

  medicamentosDisponibles = [
    'Ibuprofeno 400mg',
    'Amoxicilina 500mg',
    'Losartán 50mg',
    'Metformina 850mg',
    'Omeprazol 20mg',
    'Paracetamol 500mg',
    'Atorvastatina 20mg'
  ];

  enviando = false;
  exitoso = false;

  enviarSolicitud() {
    this.enviando = true;
    // Simular envío
    setTimeout(() => {
      this.enviando = false;
      this.exitoso = true;
      setTimeout(() => {
        this.exitoso = false;
        this.resetForm();
      }, 3000);
    }, 1000);
  }

  resetForm() {
    this.solicitud = {
      medicamento: '',
      cantidad: 1,
      frecuencia: 'diaria',
      duracion: 30,
      observaciones: ''
    };
  }
}
