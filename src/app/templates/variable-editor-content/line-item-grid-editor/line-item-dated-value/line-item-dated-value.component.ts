import { Document } from '../../../../documents/documents.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'line-item-dated-value',
  templateUrl: './line-item-dated-value.component.html',
  styleUrls: ['./line-item-dated-value.component.css']
})
export class LineItemDatedValueComponent implements OnInit {

  @Input() document: Document;
  @Input() item: any;
  @Output() onChange = new EventEmitter();
  @Output() cancel = new EventEmitter();

  years = [];
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  selectedMonth: number;
  selectedYear: number;
  value: number;

  constructor() { }

  ngOnInit() {
    var start = new Date(this.document.startDate).getUTCFullYear();
    var end = new Date(this.document.endDate).getUTCFullYear();
    for (var y = start; y <= end; y++) {
      this.years.push(y);
    }
    this.selectedYear = new Date(this.item.date).getUTCFullYear();
    this.selectedMonth = new Date(this.item.date).getUTCMonth() + 1;
    this.value = this.item.value;
  }

  ok() {
    let clone = JSON.parse(JSON.stringify(this.item));
    clone.date = new Date(this.selectedYear + '-' + this.selectedMonth);
    clone.value = this.value;
    this.onChange.emit(clone);
  }

  close() {
    this.cancel.emit();
  }

}
