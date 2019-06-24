import {ILanLng} from '../interfaces/lat-lng';

export class Marker {
  public name: string;
  public pos: ILanLng;

  constructor(name: string, pos: ILanLng) {
    this.name = name;
    this.pos = pos;
  }
}
