import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

interface Entrega {
  id: number;
  usuario: string;
  direccion: string;
  fecha: string;
  hora: string;
  medicamentos: string[];
  estado: 'pendiente' | 'en proceso' | 'completada';
  observaciones?: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-entregas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.css']
})
export class EntregasComponent implements AfterViewInit {
  filtroEstado: string = '';
  searchText: string = '';
  entregaAbierta: number | null = null;

  // Coordenadas de la bodega (Norte de Bogotá)
  bodegaLat = 4.7110;
  bodegaLng = -74.0721;

  // Cache de rutas para evitar llamadas repetidas a OSRM
  private routeCache = new Map<string, { coordinates: L.LatLngExpression[], distance: number, duration: number }>();

  entregas: Entrega[] = [
    {
      id: 1,
      usuario: 'Juan Pérez',
      direccion: 'Calle 123 #45-67, Bogotá',
      fecha: '2025-12-04',
      hora: '10:00 AM',
      medicamentos: ['Ibuprofeno 400mg x30', 'Paracetamol 500mg x20'],
      estado: 'pendiente',
      observaciones: '',
      lat: 4.6097,
      lng: -74.0817
    },
    {
      id: 2,
      usuario: 'Ana Gómez',
      direccion: 'Cra 45 #67-89, Bogotá',
      fecha: '2025-12-04',
      hora: '02:00 PM',
      medicamentos: ['Amoxicilina 500mg x20'],
      estado: 'en proceso',
      observaciones: 'Llamar antes de entregar',
      lat: 4.6533,
      lng: -74.0836
    },
    {
      id: 3,
      usuario: 'Carlos Ruiz',
      direccion: 'Av. Siempre Viva 742, Bogotá',
      fecha: '2025-12-03',
      hora: '11:30 AM',
      medicamentos: ['Losartán 50mg x30'],
      estado: 'completada',
      observaciones: '',
      lat: 4.6782,
      lng: -74.0532
    }
  ];

  ngAfterViewInit() {
    // Los mapas se inicializan cuando se abre el detalle
  }

  get entregasFiltradas() {
    let lista = this.entregas;
    if (this.filtroEstado) {
      lista = lista.filter(e => e.estado === this.filtroEstado);
    }
    if (this.searchText.trim()) {
      lista = lista.filter(e =>
        e.usuario.toLowerCase().includes(this.searchText.toLowerCase()) ||
        e.medicamentos.some(m => m.toLowerCase().includes(this.searchText.toLowerCase()))
      );
    }
    return lista;
  }

  toggleDetalle(id: number) {
    this.entregaAbierta = this.entregaAbierta === id ? null : id;
    if (this.entregaAbierta === id) {
      // Inicializar mapa después de que el DOM se actualice
      setTimeout(() => this.initMap(id), 100);
    }
  }

  marcarCompletada(entrega: Entrega) {
    entrega.estado = 'completada';
  }

  // Calcular distancia usando fórmula de Haversine
  calcularDistancia(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.toRad(lat2 - lat1);
    const dLng = this.toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  async initMap(entregaId: number) {
    const entrega = this.entregas.find(e => e.id === entregaId);
    if (!entrega) return;

    // Detectar si es vista móvil o desktop
    const isMobile = window.innerWidth < 640;
    const mapId = isMobile ? `map-mobile-${entregaId}` : `map-${entregaId}`;
    
    const mapElement = document.getElementById(mapId);
    if (!mapElement) return;

    // Limpiar contenedor si existe mapa previo
    mapElement.innerHTML = '';

    // Crear mapa centrado en la ubicación de entrega
    const map = L.map(mapId).setView([entrega.lat, entrega.lng], 13);

    // Agregar capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Icono personalizado para la bodega
    const bodegaIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Icono personalizado para la entrega
    const entregaIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Marcador de la bodega
    L.marker([this.bodegaLat, this.bodegaLng], { icon: bodegaIcon })
      .addTo(map)
      .bindPopup('<b>Bodega MediExpress</b><br>Punto de origen');

    // Marcador de la entrega
    L.marker([entrega.lat, entrega.lng], { icon: entregaIcon })
      .addTo(map)
      .bindPopup(`<b>${entrega.usuario}</b><br>${entrega.direccion}`);

    // Obtener ruta real usando OSRM (Open Source Routing Machine)
    try {
      const route = await this.getOSRMRouteWithCache(this.bodegaLat, this.bodegaLng, entrega.lat, entrega.lng);
      if (route && route.coordinates) {
        // Dibujar la ruta real siguiendo las calles
        L.polyline(route.coordinates, { 
          color: '#3B82F6', 
          weight: 4, 
          opacity: 0.7 
        }).addTo(map);

        // Ajustar vista para mostrar toda la ruta
        const bounds = L.latLngBounds(route.coordinates);
        map.fitBounds(bounds, { padding: [50, 50] });
      } else {
        // Si falla OSRM, usar línea recta como fallback
        this.drawStraightLine(map);
      }
    } catch (error) {
      console.error('Error obteniendo ruta OSRM:', error);
      // Fallback a línea recta
      this.drawStraightLine(map);
    }
  }

  private drawStraightLine(map: L.Map) {
    const entrega = this.entregas.find(e => e.id === this.entregaAbierta);
    if (!entrega) return;

    const latlngs: L.LatLngExpression[] = [
      [this.bodegaLat, this.bodegaLng],
      [entrega.lat, entrega.lng]
    ];
    L.polyline(latlngs, { color: 'blue', weight: 3, opacity: 0.6 }).addTo(map);

    const bounds = L.latLngBounds([
      [this.bodegaLat, this.bodegaLng],
      [entrega.lat, entrega.lng]
    ]);
    map.fitBounds(bounds, { padding: [50, 50] });
  }

  private async getOSRMRouteWithCache(lat1: number, lng1: number, lat2: number, lng2: number): Promise<{ coordinates: L.LatLngExpression[], distance: number, duration: number } | null> {
    // Crear clave única para esta ruta
    const cacheKey = `${lat1.toFixed(4)},${lng1.toFixed(4)}-${lat2.toFixed(4)},${lng2.toFixed(4)}`;
    
    // Verificar si ya existe en cache
    if (this.routeCache.has(cacheKey)) {
      console.log('Ruta obtenida desde cache:', cacheKey);
      return this.routeCache.get(cacheKey)!;
    }

    // Si no está en cache, obtener de OSRM
    console.log('Obteniendo ruta desde OSRM:', cacheKey);
    const route = await this.getOSRMRoute(lat1, lng1, lat2, lng2);
    
    // Guardar en cache si fue exitoso
    if (route) {
      this.routeCache.set(cacheKey, route);
    }
    
    return route;
  }

  private async getOSRMRoute(lat1: number, lng1: number, lat2: number, lng2: number): Promise<{ coordinates: L.LatLngExpression[], distance: number, duration: number } | null> {
    const url = `https://router.project-osrm.org/route/v1/driving/${lng1},${lat1};${lng2},${lat2}?overview=full&geometries=geojson`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const coordinates = route.geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]] as L.LatLngExpression);
        
        return {
          coordinates,
          distance: route.distance / 1000, // metros a km
          duration: route.duration / 60 // segundos a minutos
        };
      }
      return null;
    } catch (error) {
      console.error('Error en petición OSRM:', error);
      return null;
    }
  }

  getDistancia(entrega: Entrega): string {
    const dist = this.calcularDistancia(this.bodegaLat, this.bodegaLng, entrega.lat, entrega.lng);
    return dist.toFixed(2);
  }
}
