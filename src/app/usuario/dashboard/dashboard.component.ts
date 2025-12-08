import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Mock de solicitudes activas
  solicitudesActivas = [
    { id: 1, medicamento: 'Ibuprofeno 400mg', cantidad: 30, estado: 'En proceso', fechaSolicitud: '2025-12-01' },
    { id: 2, medicamento: 'Amoxicilina 500mg', cantidad: 20, estado: 'Aprobada', fechaSolicitud: '2025-11-28' }
  ];

  // Mock de próximas entregas
  proximasEntregas = [
    { id: 1, medicamento: 'Amoxicilina 500mg', fecha: '2025-12-05', hora: '10:00 AM', direccion: 'Calle 123 #45-67' },
    { id: 2, medicamento: 'Losartán 50mg', fecha: '2025-12-08', hora: '02:00 PM', direccion: 'Calle 123 #45-67' }
  ];
}
