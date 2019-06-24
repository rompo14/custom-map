import {Component, OnInit, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {} from 'googlemaps';
import {ILanLng} from './interfaces/lat-lng';
import {MapService} from './services/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  items: string[] = [];
  mapCenter: ILanLng = {
    lat: 18.5793,
    lng: 73.8143
  };

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.mapService.initMap(this.gmapElement, this.mapCenter);
  }

  onItemAdded(title: string) {
    this.items.push(title);
    this.mapService.addMarker(this.mapCenter, title);
  }

  onListDropped(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.mapService.sortMarkers(event);
  }

  onItemRemoved(index: number) {
    this.items.splice(index, 1);
    this.mapService.deleteMarker(index);
  }
}
