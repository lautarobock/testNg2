import { Document } from '../../../../documents/documents.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'line-item-escalating-value',
  templateUrl: './line-item-escalating-value.component.html',
  styleUrls: ['./line-item-escalating-value.component.css']
})
export class LineItemEscalatingValueComponent implements OnInit {

  @Input() document: Document;
  @Input() item: any;
  @Output() onChange = new EventEmitter();
  @Output() cancel = new EventEmitter();
  
  years = [];
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  selectedStartMonth: number;
  selectedStartYear: number;
  selectedEndMonth: number;
  selectedEndYear: number;
  value: number;
  escalationRate: number;

  constructor() { }

  ngOnInit() {
    var start = new Date(this.document.startDate).getUTCFullYear();
    var end = new Date(this.document.endDate).getUTCFullYear();
    for (var y = start; y <= end; y++) {
      this.years.push(y);
    }
    this.selectedStartYear = new Date(this.item.startDate).getUTCFullYear();
    this.selectedStartMonth = new Date(this.item.startDate).getUTCMonth() + 1;
    this.selectedEndYear = new Date(this.item.endDate).getUTCFullYear();
    this.selectedEndMonth = new Date(this.item.endDate).getUTCMonth() + 1;
    this.value = this.item.value;
    this.escalationRate = this.item.escalationRate;
  }
  
  ok() {
    let clone = JSON.parse(JSON.stringify(this.item));
    clone.startDate = new Date(this.selectedStartYear + '-' + this.selectedStartMonth);
    clone.endDate = new Date(this.selectedEndYear + '-' + this.selectedEndMonth);
    clone.value = this.value;
    clone.escalationRate = this.escalationRate;
    this.onChange.emit(clone);
  }

  close() {
    this.cancel.emit();
  }

}
