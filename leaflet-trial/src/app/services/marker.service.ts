import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  huts = 'assets/data/huts.geojson';

  constructor(private http: HttpClient) { }

  makeHutMarkers(map: L.map): void {
    this.http.get(this.huts).subscribe((res: any) => {
      for (const hut of res.features) {
        const lat = hut.geometry.coordinates[0];
        const lon = hut.geometry.coordinates[1];
        const marker = L.marker([lon, lat]).addTo(map);
      }
    });
  }
}
