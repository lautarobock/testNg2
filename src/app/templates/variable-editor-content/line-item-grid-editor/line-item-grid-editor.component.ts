import { ConfirmationDialog } from '../../../util/confirmation-dialog/confirmation-dialog.component';
import { Value } from '../../../documents/value.model';
import { LineItemTypeText } from '../../../documents/documents.service';
import { DecimalPipe, DatePipe } from '@angular/common';
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

  constructor(
    decimalPipe: DecimalPipe, 
    toastyService: ToastyService, 
    private lineItemTypeText: LineItemTypeText,
    private datePipe: DatePipe,
    private confirmationDialog: ConfirmationDialog
  ) { 
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

  buildfriendlyDescription(lineItem, idx) {
    if ( lineItem.lineItemType === 'Dated Value' ) {
      let value = this.formatter.format(lineItem.value,this.rowContexts[idx].selectedUnit);
      let date = this.datePipe.transform(lineItem.date,'MMMM yyyy');
      return `${value} in ${date}`;
    } else if ( lineItem.lineItemType === 'Escalating Value' ) {
      let value = this.formatter.format(lineItem.value,this.rowContexts[idx].selectedUnit);
      let start = this.datePipe.transform(lineItem.startDate,'MMMM yyyy');
      let end = this.datePipe.transform(lineItem.endDate,'MMMM yyyy');
      return `${value} from ${start} unit ${end} excalated at ${lineItem.escalationRate}`;
    } else if ( lineItem.lineItemType === 'Periodic Values' ) {
      return lineItem.containedValues.map(value => this.formatter.format(value.value, this.rowContexts[idx].selectedUnit)).join('\t');
    } else {
      return lineItem.friendlyDescription;
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

  changeLineItemComment(variableId) {
    this.value(variableId).updateLineItem(this.value(variableId).lineItems());
  }

  addLineItem(variableId) {
    let newItem = {
        // date: new Date(),
        // isValid: true,
        // operation: "Add",
      containedValues: this.value(variableId).values().map(value => {
        return {
          value: 0,
          periodString: value.periodString
        }
      }),
      escalationRate: 0,
      startDate: this.document.startDate,
      endDate: this.document.endDate,
      // friendlyDescription: "",
      operation: "Add",
      comment: "",
      lineItemType: "Periodic Values",
      value: 0
    };
    let lineItems = this.value(variableId).lineItems();
    lineItems.push(newItem);
    this.value(variableId).updateLineItem(lineItems);
  }

  removeLineItem(lineItemIdx, variableId) {
    this.confirmationDialog.open(`Are you sure to remove line item with ID ${lineItemIdx+1}?`,'Remove Line Item').then(() => {
      let lineItems = this.value(variableId).lineItems();
      lineItems.splice(lineItemIdx,1);
      this.value(variableId).updateLineItem(lineItems);
    }).catch(() => console.log('no'));
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
    } else if ( lineItem.lineItemType === 'Expression' ) {
      lineItem.expression = '';
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
