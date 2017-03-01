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

  constructor(decimalPipe: DecimalPipe, toastyService: ToastyService) { 
    super(decimalPipe, toastyService);
  }

  isReadOnly(idx) : boolean {
    return this.document.readonly || this.value(this.editor.variableIds[idx]).periodicExpression();
  }

}
