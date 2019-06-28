import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() items: string[];
  @Output() listDropped = new EventEmitter<any>();
  @Output() itemRemoved = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  onDrop(event: CdkDragDrop<string[]>) {
    this.listDropped.emit(event);
  }

  onRemoveItem(index: number) {
    this.itemRemoved.emit(index);
  }
}
