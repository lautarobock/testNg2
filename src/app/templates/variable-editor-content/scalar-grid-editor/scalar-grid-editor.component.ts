import { ValueFormatter } from '../time-series-grid-editor/time-series-grid-editor.component';
import { CurrencyReader, UnitReader } from '../../../documents/unit-reader';
import { ToastyService } from 'ng2-toasty';
import { DecimalPipe } from '@angular/common/src/pipes/number_pipe';
import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';

@Component({
  selector: 'app-scalar-grid-editor',
  templateUrl: './scalar-grid-editor.component.html',
  styleUrls: ['./scalar-grid-editor.component.css']
})
@RegisterEditor(EditorType.ScalarGrid)
export class ScalarGridEditorComponent extends AbstractEditorComponent implements OnInit {

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
  text2CopyByRow: Array<string>;
  text2CopyAll: string;

  constructor(private decimalPipe: DecimalPipe, private toastyService: ToastyService) { 
    super();
  }

  ngOnInit() {
    //General Config
    this.decimalPlaces = this.parent.jsonProperties().DecimalPlaces || 2;
    this.numberFormat = `1.${this.decimalPlaces}-${this.decimalPlaces}`;
    this.displayZeroValuesAs = this.parent.jsonProperties().DisplayZeroValuesAs || 0;
    this.groupName = this.parent.jsonProperties().GroupName;
    //Units by row
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
    // //Text for copy to clipboard
    // this.text2CopyByRow = this.editor.variableIds.map((variableId,idx) => this.text2Copy(variableId,idx));
    // this.text2CopyAll = this.text2CopyByRow.join('\n');
    // //Listen for changes
    // this.editor.variableIds.forEach((variableId, idx) => this.value(variableId).onChange.subscribe(data => this.updateText2Copy(variableId,idx)));
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

}
