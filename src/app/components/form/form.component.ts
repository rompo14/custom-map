import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  item: string;
  @ViewChild('myForm') form;
  @Output() itemAdded = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.form.status === 'VALID') {
      this.itemAdded.emit(this.item);
      this.form.resetForm();
    }
  }
}
