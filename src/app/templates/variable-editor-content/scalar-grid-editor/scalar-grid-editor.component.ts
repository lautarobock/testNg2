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

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
