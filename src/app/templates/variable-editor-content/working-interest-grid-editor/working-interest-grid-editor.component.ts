import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';

@Component({
  selector: 'app-working-interest-grid-editor',
  templateUrl: './working-interest-grid-editor.component.html',
  styleUrls: ['./working-interest-grid-editor.component.css']
})
@RegisterEditor(EditorType.WorkingInterestGrid)
export class WorkingInterestGridEditorComponent extends AbstractEditorComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
