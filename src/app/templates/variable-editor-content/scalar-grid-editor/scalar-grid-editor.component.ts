import { EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';
import { AbstractGridEditorComponent } from '../abstract-grid-editor/abstract-grid-editor';
import { DecimalPipe } from '@angular/common/src/pipes/number_pipe';
import { Component } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-scalar-grid-editor',
  templateUrl: './scalar-grid-editor.component.html',
  styleUrls: [
    './scalar-grid-editor.component.css', 
    '../abstract-grid-editor/abstract-grid-editor.css'
  ]
})
@RegisterEditor(EditorType.ScalarGrid)
export class ScalarGridEditorComponent extends AbstractGridEditorComponent {

  constructor(decimalPipe: DecimalPipe, toastyService: ToastyService) { 
    super(decimalPipe,toastyService);
  }
  
  isReadOnly(idx) : boolean {
    return this.document.readonly || this.value(this.editor.variableIds[idx]).scalarExpression();
  }

  columns(): string[] {
    return this.value(this.variableId()).values().map(value => value.lookup);
  }
}
