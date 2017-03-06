import { Value } from '../../../documents/value.model';
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
    if ( expand ) {
      this.expanded[idx]={};
    } else {
      this.expanded[idx]=null;
    }
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

  changeLineItemType(idx, variableId, lineItem, lineItemIdx) {
    //Fill empty data
    if ( lineItem.lineItemType === 'Dated Value' ) {
      lineItem.date = lineItem.date || this.document.startDate;
      lineItem.value = lineItem.value || 0;
    } else if ( lineItem.lineItemType === 'Escalating Value' ) {
      lineItem.startDate = lineItem.startDate || this.document.startDate;
      lineItem.endDate = lineItem.endDate || this.document.endDate;
      lineItem.value = lineItem.value || 0;
      lineItem.escalationRate = lineItem.escalationRate || 0;
    } else if ( lineItem.lineItemType === 'Periodic Values' ) {
      lineItem.containedValues = lineItem.containedValues || this.value(variableId).values().map(value => {
        return {
          value: value.value,
          periodString: value.periodString
        }
      });
      
    }
    this.expanded[idx][lineItemIdx] = false;
    let lineItems = this.value(variableId).lineItems();
    lineItems[lineItemIdx] = lineItem;
    this.value(variableId).updateLineItem(lineItems);
  }

  editLineItem(idx,lineItemIdx) {
    this.expanded[idx][lineItemIdx] = true;
  }

  closeLineItem(idx, lineItemIdx) {
    this.expanded[idx][lineItemIdx] = false;
  }

  changeLineItem(idx, variableId, lineItem, lineItemIdx) {
    this.expanded[idx][lineItemIdx] = false;
    let lineItems = this.value(variableId).lineItems();
    lineItems[lineItemIdx] = lineItem;
    this.value(variableId).updateLineItem(lineItems);
  }

}
