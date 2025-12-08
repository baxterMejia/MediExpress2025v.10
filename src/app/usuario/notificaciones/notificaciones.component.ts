import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent {
  notificaciones = [
    {
      id: 1,
      tipo: 'entrega',
      titulo: 'Entrega programada',
      mensaje: 'Tu entrega de Amoxicilina 500mg está programada para mañana a las 10:00 AM',
      fecha: '2025-12-03 09:30',
      leida: false
    },
    {
      id: 2,
      tipo: 'solicitud',
      titulo: 'Solicitud aprobada',
      mensaje: 'Tu solicitud de Ibuprofeno 400mg ha sido aprobada',
      fecha: '2025-12-02 14:15',
      leida: false
    },
    {
      id: 3,
      tipo: 'recordatorio',
      titulo: 'Recordatorio de medicamento',
      mensaje: 'No olvides tomar tu Losartán 50mg',
      fecha: '2025-12-02 08:00',
      leida: true
    },
    {
      id: 4,
      tipo: 'entrega',
      titulo: 'Entrega completada',
      mensaje: 'Tu entrega de Paracetamol 500mg fue realizada exitosamente',
      fecha: '2025-12-01 11:20',
      leida: true
    },
    {
      id: 5,
      tipo: 'sistema',
      titulo: 'Actualización de perfil',
      mensaje: 'Tu información de perfil ha sido actualizada correctamente',
      fecha: '2025-11-30 16:45',
      leida: true
    }
  ];

  marcarComoLeida(notificacion: any) {
    notificacion.leida = true;
  }

  marcarTodasLeidas() {
    this.notificaciones.forEach(n => n.leida = true);
  }

  eliminarNotificacion(id: number) {
    this.notificaciones = this.notificaciones.filter(n => n.id !== id);
  }

  getIcono(tipo: string): string {
    const iconos: any = {
      'entrega': '🚚',
      'solicitud': '📋',
      'recordatorio': '⏰',
      'sistema': '⚙️'
    };
    return iconos[tipo] || '📧';
  }

  get notificacionesNoLeidas() {
    return this.notificaciones.filter(n => !n.leida).length;
  }
}
