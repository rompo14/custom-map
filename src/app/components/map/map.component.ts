import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ILanLng} from '../../interfaces/lat-lng';
import {MapService} from '../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  @Input() center: ILanLng;
  @Output() mapCreated = new EventEmitter();

  constructor(private mapService: MapService) { }

  ngOnInit() {
    // this.mapService.initMap(this.gmapElement, this.center);
  }
}
