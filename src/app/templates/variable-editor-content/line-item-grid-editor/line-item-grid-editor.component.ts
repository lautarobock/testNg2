import { LineItemTypeText } from '../../../documents/documents.service';
import { DecimalPipe } from '@angular/common/src/pipes/number_pipe';
import { ToastyService } from 'ng2-toasty';
import { AbstractGridEditorComponent } from '../abstract-grid-editor/abstract-grid-editor';
import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';

@Component({
  selector: 'app-line-item-grid-editor',
  templateUrl: './line-item-grid-editor.component.html',
  styleUrls: [
    './line-item-grid-editor.component.css', 
    '../abstract-grid-editor/abstract-grid-editor.css'
  ]
})
@RegisterEditor(EditorType.LineItemGrid)
export class LineItemGridEditorComponent extends AbstractGridEditorComponent {

  expanded = {};
  isEditLineItem = {};
  lineItemTypeTexts : string[] = [];


  constructor(decimalPipe: DecimalPipe, toastyService: ToastyService, private lineItemTypeText: LineItemTypeText) { 
    super(decimalPipe, toastyService);
    this.lineItemTypeTexts = lineItemTypeText.names;
  }

  isReadOnly(idx) : boolean {
    return this.document.readonly || this.value(this.editor.variableIds[idx]).periodicExpression();
  }

  columns(): string[] {
    return this.value(this.variableId()).values().map(value => value.periodString);
  }

  expandLineItems(idx: number, expand: boolean) {
    this.expanded[idx]=expand;
    this.isEditLineItem = {};
  }

  updateLineItemType(variableId, idx, selectedTypeIdx: number) {
    let lineItems = JSON.parse(JSON.stringify(this.value(variableId).lineItems()));
    lineItems[idx].lineItemType = this.lineItemTypeTexts[selectedTypeIdx];
    this.value(variableId).updateLineItem(lineItems);
  }

  updateLineItemOperation(variableId, idx, checked) {
    let lineItems = this.value(variableId).lineItems();
    lineItems[idx].operation = checked ? 'Add' : 'None';
    this.value(variableId).updateLineItem(lineItems);
  }

  editLineItem(lineItemIdx) {
    this.isEditLineItem[lineItemIdx] = true;
  }

  closeLineItem(lineItemIdx) {
    this.isEditLineItem[lineItemIdx] = false;
  }

  changeLineItem(variableId, lineItem, lineItemIdx) {
    this.isEditLineItem[lineItemIdx] = false;
    let lineItems = this.value(variableId).lineItems();
    lineItems[lineItemIdx] = lineItem;
    this.value(variableId).updateLineItem(lineItems);
  }

}
