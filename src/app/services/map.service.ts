import {Injectable} from '@angular/core';
import {} from 'googlemaps';
import {ILanLng} from '../interfaces/lat-lng';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  poly: google.maps.Polyline;
  path: google.maps.LatLng[] = [];
  private drag: number;

  constructor() {
  }

  public initMap(gmapElement: any, center: ILanLng) {
    const mapProp = {
      center: new google.maps.LatLng(center),
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(gmapElement.nativeElement, mapProp);

    this.poly = new google.maps.Polyline({
      strokeColor: '#ff0000',
      strokeOpacity: 1.0,
      strokeWeight: 3,
      geodesic: true
    });
    this.poly.setMap(this.map);
  }

  public addMarker(position: ILanLng, title: string) {
    const marker = new google.maps.Marker({
      position,
      map: this.map,
      title,
      draggable: true
    });

    const infowindow = new google.maps.InfoWindow({
      content: title
    });

    this.markers.push(marker);
    this.path.push(marker.getPosition());
    this.drowPath();

    marker.addListener('click', () => {
      infowindow.open(this.map, marker);
    });
    marker.addListener('dragend', event => this.onDragEnd(event));
    marker.addListener('dragstart', event => this.onDragStart(event));
  }

  public deleteMarker(index: number) {
    this.path.splice(index, 1);
    this.markers[index].setMap(null);
    this.markers.splice(index, 1);
    this.drowPath();
  }

  private onDragStart(event) {
    this.path.filter((latLng) => {
      if (latLng === event.latLng) {
        this.drag = this.path.lastIndexOf(latLng);
      }
    });
  }

  private onDragEnd(event) {
    this.path[this.drag] = event.latLng;
    this.drowPath();
  }

  public drowPath() {
    this.poly.setPath(this.path);
  }

  public sortMarkers(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.path, event.previousIndex, event.currentIndex);
    moveItemInArray(this.markers, event.previousIndex, event.currentIndex);
    this.drowPath();
  }
}
