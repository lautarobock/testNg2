import { ToastyService } from 'ng2-toasty';
import { Value } from '../../../documents/value.model';
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
  selectedCP = {};

  constructor(private decimalPipe: DecimalPipe, private toastyService: ToastyService,) { 
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
  // unit(variableId) {
  //   let units = new UnitReader(this.document.variableDefinitions[variableId].unit).unique();
  //   return units.find(u=> u.display === this.value(variableId).unit()).factor;
  // }

  computedValue(value, unit) {
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

  onPasteRow(text:string, variableId: number, idx: number) {
    try {
      let pastedValues = new RowParser(text,this.unitsByRow[idx]).values();
      if ( pastedValues.variablePrompt !== this.document.variableDefinitions[variableId].prompt ) {
        this.toastyService.error('Variable name do not match');
        return;
      }
      if ( pastedValues.categoryName !== this.document.variableDefinitions[variableId].category.name ) {
        this.toastyService.error('Category name do not match');
        return;
      }
      this.selectedUnitsByRow[idx] = pastedValues.unit;
      this.value(variableId).updateAll(this.value(variableId).values().map((v,idx) => {
        v.value = pastedValues.values[idx];
        return v;
      }));
    } catch(err) {
      this.toastyService.error(err.message);
    }
  }

  onPasteAll(text: string) {
    text.split('\n').map((row, idx) => new RowParser(row,this.unitsByRow[idx]).values())
  }

  text2CopyAll() {
    return this.editor.variableIds.map( (variableId,idx) => this.text2Copy(variableId, idx)).join('\n');
  }

  text2Copy(variableId:number, idx: number) {
    return new RowSerializer(
      this.document.variableDefinitions[variableId].prompt,
      this.document.variableDefinitions[variableId].category.name,
      this.value(variableId).values(),
      this.selectedUnitsByRow[idx],
      new ValueFormatter(
        this.selectedUnitsByRow[idx],
        this.displayZeroValuesAs,
        this.numberFormat,
        this.decimalPipe
      )
    ).toString()
  }
}

export class ValueFormatter {
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

export class RowSerializer {

  constructor(
    private prompt: string,
    private category: string,
    private values: Array<any>,
    private unit: any, 
    private formatter: ValueFormatter
  ) { }

  toString() {
    return `${this.prompt}\t${this.category}\t${this.unit.display}\t` 
      + this.values.map(periodValue => {
        return this.formatter.format(periodValue.value);
      }).join('\t');
  }

}

export class RowParser {

  constructor(private rowText: string, private units: Array<any>) {}

  values() {
    let fields = this.rowText.split('\t');
    let unit = this.units.find(u=>u.display === fields[2]);
    if ( !unit ) {
      throw new Error('Unit do not match with any of the list');
    }
    return {
      variablePrompt: fields[0],
      categoryName: fields[1],
      unit,
      values: fields.slice(3).map(v => parseFloat(v) / unit.factor)
    };
  }
}