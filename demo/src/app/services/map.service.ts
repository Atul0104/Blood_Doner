import { Injectable } from '@angular/core';
import * as L from 'leaflet';

// Configure Leaflet default icon with CDN URLs
const DefaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.setIcon(DefaultIcon);

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: L.Map | null = null;
  private markers: L.Marker[] = [];

  constructor() {}

  initializeMap(elementId: string, center: [number, number] = [19.0760, 72.8777], zoom: number = 6): L.Map {
    if (this.map) {
      return this.map;
    }

    this.map = L.map(elementId, {
      center: center,
      zoom: zoom,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19,
          minZoom: 2
        })
      ]
    });

    return this.map;
  }

  addMarker(lat: number, lng: number, title: string, popupContent?: string): L.Marker {
    if (!this.map) {
      throw new Error('Map not initialized');
    }

    const marker = L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup(popupContent || title)
      .bindTooltip(title);

    this.markers.push(marker);
    return marker;
  }

  addDonorMarkers(donors: any[]): void {
    if (!this.map) {
      throw new Error('Map not initialized');
    }

    this.clearMarkers();

    donors.forEach(donor => {
      const popupContent = `
        <div style="font-family: Arial; width: 200px;">
          <h4 style="color: var(--burgundy);">${donor.name}</h4>
          <p><strong>Blood Group:</strong> <span style="background: var(--burgundy); color: white; padding: 2px 6px; border-radius: 3px;">${donor.bloodGroup}</span></p>
          <p><strong>City:</strong> ${donor.city}</p>
          <p><strong>Phone:</strong> ${donor.phone}</p>
        </div>
      `;
      this.addMarker(donor.latitude, donor.longitude, donor.name, popupContent);
    });
  }

  clearMarkers(): void {
    this.markers.forEach(marker => {
      if (this.map) {
        this.map.removeLayer(marker);
      }
    });
    this.markers = [];
  }

  setCenter(lat: number, lng: number, zoom: number = 13): void {
    if (this.map) {
      this.map.setView([lat, lng], zoom);
    }
  }

  getMap(): L.Map | null {
    return this.map;
  }

  destroyMap(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
      this.markers = [];
    }
  }
}
