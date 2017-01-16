import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';

@Component({
  selector: 'app-line-item-grid-editor',
  templateUrl: './line-item-grid-editor.component.html',
  styleUrls: ['./line-item-grid-editor.component.css']
})
@RegisterEditor(EditorType.LineItemGrid)
export class LineItemGridEditorComponent extends AbstractEditorComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
