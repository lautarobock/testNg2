import { Document } from '../../../../documents/documents.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'line-item-expression',
  templateUrl: './line-item-expression.component.html',
  styleUrls: ['./line-item-expression.component.css']
})
export class LineItemExpressionComponent implements OnInit {

  @Input() document: Document;
  @Input() item: any;
  @Output() onChange = new EventEmitter();
  @Output() cancel = new EventEmitter();

  expression: string;

  constructor() { }

  ngOnInit() {
    this.expression = this.item.expression;
  }
  
  ok() {
    let clone = JSON.parse(JSON.stringify(this.item));
    clone.expression = this.expression;
    this.onChange.emit(clone);
  }

  close() {
    this.cancel.emit();
  }

}
