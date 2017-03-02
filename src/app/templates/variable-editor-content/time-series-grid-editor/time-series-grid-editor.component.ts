import { EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';
import { AbstractGridEditorComponent } from '../abstract-grid-editor/abstract-grid-editor';
import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-time-series-grid-editor',
  templateUrl: './time-series-grid-editor.component.html',
  styleUrls: [
    './time-series-grid-editor.component.css', 
    '../abstract-grid-editor/abstract-grid-editor.css'
  ]
})
@RegisterEditor(EditorType.TimeSeriesGrid)
export class TimeSeriesGridEditorComponent extends AbstractGridEditorComponent  {

  constructor(decimalPipe: DecimalPipe, toastyService: ToastyService) { 
    super(decimalPipe, toastyService);
  }
  
  isReadOnly(idx) : boolean {
    return this.document.readonly || this.value(this.editor.variableIds[idx]).periodicExpression();
  }

  columns(): string[] {
    return this.value(this.variableId()).values().map(value => value.periodString);
  }
}