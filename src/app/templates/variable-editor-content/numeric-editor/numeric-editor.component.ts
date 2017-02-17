import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';
import { UnitReader, CurrencyReader } from '../../../documents/unit-reader';

@Component({
  selector: 'app-numeric-editor',
  templateUrl: './numeric-editor.component.html',
  styleUrls: ['./numeric-editor.component.css']
})
@RegisterEditor(EditorType.NumericEditor)
export class NumericEditorComponent extends AbstractEditorComponent implements OnInit {

  units = [];
  selectedUnit = null;

  constructor() { 
    super();
  }

  ngOnInit() {
    let unit = this.document.variableDefinitions[this.variableId()].unit;
    if ( unit.isCurrency) {
      this.units = new CurrencyReader(unit, this.value()).unique();
    } else {
      this.units = new UnitReader(unit).unique();
    }
    this.selectedUnit = this.units[0];
  }

  safeWithFactor() {
    return this.value().safe() * this.selectedUnit.factor;
  }

  blurWithFactor(value) {
    this.value().update(value);
  }

}
