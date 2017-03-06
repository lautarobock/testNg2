import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'line-item-periodic-values',
  templateUrl: './line-item-periodic-values.component.html',
  styleUrls: ['./line-item-periodic-values.component.css']
})
export class LineItemPeriodicValuesComponent implements OnInit {

  @Input() document: Document;
  @Input() item: any;
  @Output() onChange = new EventEmitter();
  @Output() cancel = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  ok() {
    // this.onChange.emit(clone);
  }

  close() {
    this.cancel.emit();
  }

}
