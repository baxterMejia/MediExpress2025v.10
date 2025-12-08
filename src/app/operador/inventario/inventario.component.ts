import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Medicamento {
  id: number;
  nombre: string;
  presentacion: string;
  cantidad: number;
  minimo: number;
}

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  searchText = '';
  editandoId: number | null = null;
  cantidadEditada: number = 0;

  medicamentos: Medicamento[] = [
    { id: 1, nombre: 'Ibuprofeno', presentacion: '400mg x30', cantidad: 120, minimo: 30 },
    { id: 2, nombre: 'Amoxicilina', presentacion: '500mg x20', cantidad: 15, minimo: 20 },
    { id: 3, nombre: 'Losartán', presentacion: '50mg x30', cantidad: 60, minimo: 25 },
    { id: 4, nombre: 'Metformina', presentacion: '850mg x30', cantidad: 5, minimo: 10 },
    { id: 5, nombre: 'Omeprazol', presentacion: '20mg x30', cantidad: 40, minimo: 15 },
    { id: 6, nombre: 'Paracetamol', presentacion: '500mg x20', cantidad: 80, minimo: 20 },
    { id: 7, nombre: 'Atorvastatina', presentacion: '20mg x30', cantidad: 25, minimo: 10 }
  ];

  nuevoMedicamento: Medicamento = {
    id: 0,
    nombre: '',
    presentacion: '',
    cantidad: 0,
    minimo: 10
  };

  mostrarFormulario = false;

  get medicamentosFiltrados() {
    if (!this.searchText.trim()) return this.medicamentos;
    return this.medicamentos.filter(m =>
      m.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
      m.presentacion.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  estadoStock(m: Medicamento): 'ok' | 'bajo' | 'critico' {
    if (m.cantidad <= m.minimo) return m.cantidad === 0 ? 'critico' : 'bajo';
    return 'ok';
  }

  iniciarEdicion(m: Medicamento) {
    this.editandoId = m.id;
    this.cantidadEditada = m.cantidad;
  }

  cancelarEdicion() {
    this.editandoId = null;
    this.cantidadEditada = 0;
  }

  guardarEdicion(m: Medicamento) {
    if (this.cantidadEditada < 0) return;
    m.cantidad = this.cantidadEditada;
    this.cancelarEdicion();
  }

  agregarMedicamento() {
    if (!this.nuevoMedicamento.nombre.trim() || !this.nuevoMedicamento.presentacion.trim() || this.nuevoMedicamento.cantidad < 0) return;
    const nuevo = { ...this.nuevoMedicamento, id: Date.now() };
    this.medicamentos.push(nuevo);
    this.nuevoMedicamento = { id: 0, nombre: '', presentacion: '', cantidad: 0, minimo: 10 };
    this.mostrarFormulario = false;
  }
}
