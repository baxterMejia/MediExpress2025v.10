import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historico-entregas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historico-entregas.component.html',
  styleUrls: ['./historico-entregas.component.css']
})
export class HistoricoEntregasComponent {
  entregas = [
    {
      id: 1,
      fecha: '2025-11-28',
      hora: '10:30 AM',
      medicamentos: ['Ibuprofeno 400mg x30', 'Paracetamol 500mg x20'],
      estado: 'Entregado',
      operador: 'Carlos Rodríguez',
      direccion: 'Calle 123 #45-67'
    },
    {
      id: 2,
      fecha: '2025-11-15',
      hora: '02:15 PM',
      medicamentos: ['Amoxicilina 500mg x20'],
      estado: 'Entregado',
      operador: 'María González',
      direccion: 'Calle 123 #45-67'
    },
    {
      id: 3,
      fecha: '2025-10-30',
      hora: '11:00 AM',
      medicamentos: ['Losartán 50mg x30', 'Metformina 850mg x30'],
      estado: 'Entregado',
      operador: 'Juan Martínez',
      direccion: 'Calle 123 #45-67'
    },
    {
      id: 4,
      fecha: '2025-10-10',
      hora: '03:45 PM',
      medicamentos: ['Omeprazol 20mg x30'],
      estado: 'Entregado',
      operador: 'Ana López',
      direccion: 'Calle 123 #45-67'
    }
  ];

  entregaSeleccionada: any = null;

  verDetalle(entrega: any) {
    this.entregaSeleccionada = entrega;
  }

  cerrarDetalle() {
    this.entregaSeleccionada = null;
  }
}
