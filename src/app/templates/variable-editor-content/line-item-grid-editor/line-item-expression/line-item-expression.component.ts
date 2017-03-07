import { Value } from '../../../../documents/value.model';
import { ExpressionDialog } from '../../expression-dialog/expression-dialog.component';
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
  @Input() value: Value;
  @Input() scenario: string;
  @Output() onChange = new EventEmitter();
  @Output() cancel = new EventEmitter();

  expression: string;

  constructor(private expressionDialog: ExpressionDialog) { }

  ngOnInit() {
    this.expression = this.item.expression;
  }

  openEditor() {
    this.expressionDialog.openStandAlone(this.value,this.document,this.scenario, this.expression).then(expression => {this.expression=expression}).catch(err => console.log(err));
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
