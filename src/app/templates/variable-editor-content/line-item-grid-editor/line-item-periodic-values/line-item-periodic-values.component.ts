import { Unit } from '../../../../documents/unit-reader';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'line-item-periodic-values',
  templateUrl: './line-item-periodic-values.component.html',
  styleUrls: ['./line-item-periodic-values.component.css']
})
export class LineItemPeriodicValuesComponent implements OnInit {

  @Input() document: Document;
  @Input() item: any;
  @Input() unit: Unit;
  @Output() onChange = new EventEmitter();
  @Output() cancel = new EventEmitter();

  containedValues: any[];
  
  constructor() { }

  ngOnInit() {
    this.containedValues = this.item.containedValues.map(value => {
      return {
        value: value.value * this.unit.factor,
        periodString: value.periodString
      }
    });
  }

  ok() {
    let clone = JSON.parse(JSON.stringify(this.item));
    clone.containedValues = this.containedValues.map(value => {
      return {
        value: value.value / this.unit.factor,
        periodString: value.periodString
      }
    });
    this.onChange.emit(clone);
  }

  close() {
    this.cancel.emit();
  }

}
