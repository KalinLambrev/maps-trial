import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../services/marker.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  private map;

  constructor(private markerService: MarkerService) { }

  ngAfterViewInit(): void {

    this.initMap();
    this.markerService.makeHutMarkers(this.map);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [42.180414, 23.771502],
      zoom: 8
    });

    const tiles = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png?', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      id: 'mapbox/streets-v11',
    });

    tiles.addTo(this.map);
  }


}
