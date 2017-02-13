import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';
import { UnitReader, CurrencyReader } from './unit-reader';

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
  mouseover = {};
  editionIdx = null;
  tmpValues = [];
  editTimeout;

  constructor() { 
    super();
  }

  ngOnInit() {
    this.unitsByRow = this.editor.variableIds.map(variableId=>{
      if ( this.document.variableDefinitions[variableId].unit.isCurrency) {
        return new CurrencyReader(this.document.variableDefinitions[variableId].unit, this.value(variableId)).unique()
      } else {
        return new UnitReader(this.document.variableDefinitions[variableId].unit).unique()
      }
    });
    this.selectedUnitsByRow = this.editor.variableIds.map( (variableId, idx) =>{
      return this.unitsByRow[idx].find(u=> u.display === this.value(variableId).unit())
    });
    this.decimalPlaces = this.parent.jsonProperties().DecimalPlaces || 2;
    this.numberFormat = `1.${this.decimalPlaces}-${this.decimalPlaces}`;
    this.displayZeroValuesAs = this.parent.jsonProperties().DisplayZeroValuesAs || 0;
  }

  edit(idx) {
    if ( this.editionIdx !== null ) return;
    this.editionIdx = idx;
    this.tmpValues =  JSON.parse(JSON.stringify(this.value(this.editor.variableIds[idx]).values()));
    this.tmpValues.forEach(value=>value.value = value.value * this.selectedUnitsByRow[idx].factor);
    setTimeout(()=> document.getElementById('input-grid-0').focus() ,50);
  }

  focus() {
    if ( this.editTimeout ) {
      clearTimeout(this.editTimeout);
      this.editTimeout = null;
    }
  }

  blur() {
    this.editTimeout = setTimeout(()=>{
      this.tmpValues.forEach(value=>value.value = value.value / this.selectedUnitsByRow[this.editionIdx].factor);
      this.value(this.editor.variableIds[this.editionIdx]).updateAll(this.tmpValues);
      this.tmpValues=[];
      this.editionIdx=null;

    },1000);
  }

  unit(variableId) {
    let units = new UnitReader(this.document.variableDefinitions[variableId].unit).unique();
    return units.find(u=> u.display === this.value(variableId).unit()).factor;
  }

  computedValue(value, unit) {
    // value = value || 0;
    if ( value ) {
      return value * unit.factor;
    } else {
      return this.displayZeroValuesAs;
    }
  }
}
