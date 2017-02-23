import { Value } from '../../../documents/value.model';
import { Values } from '../../../documents/values.model';
import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';
import { UnitReader, CurrencyReader } from '../../../documents/unit-reader';

@Component({
  selector: 'app-time-series-grid-editor',
  templateUrl: './time-series-grid-editor.component.html',
  styleUrls: ['./time-series-grid-editor.component.css']
})
@RegisterEditor(EditorType.TimeSeriesGrid)
export class TimeSeriesGridEditorComponent extends AbstractEditorComponent implements OnInit {

  unitsByRow: Array<any> = [];
  selectedUnitsByRow: Array<any> = [];
  decimalPlaces = 2;
  numberFormat = '1.2-2';
  displayZeroValuesAs = 0;
  groupName: string;
  mouseover = {};
  editionIdx = null;
  tmpValues = [];
  editTimeout;

  constructor(private decimalPipe: DecimalPipe) { 
    super();
  }

  ngOnInit() {
    this.unitsByRow = this.editor.variableIds.map(variableId=>{
      if ( this.document.variableDefinitions[variableId].unit.isCurrency) {
        return new CurrencyReader(this.document.variableDefinitions[variableId].unit, this.value(variableId)).unique();
      } else {
        return new UnitReader(this.document.variableDefinitions[variableId].unit).unique();
      }
    });
    this.selectedUnitsByRow = this.editor.variableIds.map( (variableId, idx) =>{
      return this.unitsByRow[idx].find(u=> u.display === this.value(variableId).unit());
    });
    this.decimalPlaces = this.parent.jsonProperties().DecimalPlaces || 2;
    this.numberFormat = `1.${this.decimalPlaces}-${this.decimalPlaces}`;
    this.displayZeroValuesAs = this.parent.jsonProperties().DisplayZeroValuesAs || 0;
    this.groupName = this.parent.jsonProperties().GroupName;
  }

  cellCursor(idx) {
    if ( this.document.readonly || this.value(this.editor.variableIds[idx]).periodicExpression() ) {
      return 'not-allowed';
    } else {
      return 'pointer';
    }
  }

  edit(idx, periodIdx) {
    if ( this.document.readonly || this.value(this.editor.variableIds[idx]).periodicExpression() ) return;
    if ( this.editionIdx !== null ) return;
    this.editionIdx = idx;
    this.tmpValues =  JSON.parse(JSON.stringify(this.value(this.editor.variableIds[idx]).values()));
    this.tmpValues.forEach(value=>value.value = value.value * this.selectedUnitsByRow[idx].factor);
    setTimeout(()=> document.getElementById(`input-grid-${periodIdx}`).focus() ,50);
  }

  cancelEdit() {
    this.editionIdx=null;
    setTimeout(()=>this.tmpValues=[],50);
    if ( this.editTimeout ) {
      clearTimeout(this.editTimeout);
      this.editTimeout = null;
    }
  }

  focus() {
    if ( this.editTimeout ) {
      clearTimeout(this.editTimeout);
      this.editTimeout = null;
    }
  }

  blur() {
    if ( this.editionIdx !== null ) {
      this.editTimeout = setTimeout(()=>{
        this.tmpValues.forEach(value=>value.value = value.value / this.selectedUnitsByRow[this.editionIdx].factor);
        this.value(this.editor.variableIds[this.editionIdx]).updateAll(this.tmpValues);
        this.tmpValues=[];
        this.editionIdx=null;
      },500);
    }
  }

  //@Deprecated
  unit(variableId) {
    let units = new UnitReader(this.document.variableDefinitions[variableId].unit).unique();
    return units.find(u=> u.display === this.value(variableId).unit()).factor;
  }

  computedValue(value, unit) {
    // if ( value ) {
    //   return value * unit.factor;
    // } else {
    //   return this.displayZeroValuesAs;
    // }
    return new ValueFormatter(
      unit,
      this.displayZeroValuesAs,
      this.numberFormat,
      this.decimalPipe
    ).format(value);
  }
  
  commentValue(variableId: number) {
    return this.value(variableId);
  }

  onPasteRow(text, variableId) {
    console.log('PASTE', variableId, text);
  }

  text2Copy(variableId:number, idx: number) {
    return new RowSerializer(
      variableId,
      this.value(variableId),
      this.selectedUnitsByRow[idx],
      this.document.variableDefinitions,
      this.displayZeroValuesAs,
      this.numberFormat,
      this.decimalPipe
    ).toString()
  }
}

class ValueFormatter {
  constructor(
    private unit: any, 
    private displayZeroValuesAs: number, 
    private numberFormat: string,
    private decimalPipe: DecimalPipe
  ) {}

  format(value: number) {
    return this.decimalPipe.transform(this.computedValue(value),this.numberFormat);
  }

  computedValue(value) {
    if ( value ) {
      return value * this.unit.factor;
    } else {
      return this.displayZeroValuesAs;
    }
  }
}

class RowSerializer {

  private formatter: ValueFormatter;

  constructor(
    private variableId: number, 
    private value: Value, 
    private unit: any, 
    private variableDefinitions: any, 
    private displayZeroValuesAs: number, 
    private numberFormat: string,
    private decimalPipe: DecimalPipe
  ) {
    this.formatter = new ValueFormatter(
      this.unit,
      this.displayZeroValuesAs,
      this.numberFormat,
      this.decimalPipe
    );
  }

  toString() {
    return this.variableDefinitions[this.variableId].prompt + '\t' + 
      this.variableDefinitions[this.variableId].category.name + '\t' + 
      this.unit.display + '\t' + 
      this.value.values().map(periodValue => {
        return this.formatter.format(periodValue.value);
      }).join('\t');
  }

}