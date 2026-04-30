import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
declare const google: any;


@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './locations.html',
  styleUrl: './locations.css'
})
export class Locations implements AfterViewInit {

  ngAfterViewInit(): void {
    this.loadMap();
  }

  loadMap() {
    const locations = [
      { lat: 41.0146, lng: -92.4086, name: 'Ottumwa' },
      { lat: 41.6611, lng: -91.5302, name: 'Iowa City' },
      { lat: 41.9779, lng: -91.6656, name: 'Cedar Rapids' },
      { lat: 40.6331, lng: -89.3985, name: 'Illinois' },
      { lat: 42.5083, lng: -90.6646, name: 'Dubuque' },
      { lat: 39.7817, lng: -89.6501, name: 'Springfield' }
    ];

    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      zoom: 6,
      center: locations[0],
    });

    locations.forEach(loc => {
      new google.maps.Marker({
        position: { lat: loc.lat, lng: loc.lng },
        map,
        title: loc.name,
      });
    });
  }
}
