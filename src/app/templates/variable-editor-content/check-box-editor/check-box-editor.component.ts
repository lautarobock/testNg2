import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';

@Component({
  selector: 'app-check-box-editor',
  templateUrl: './check-box-editor.component.html',
  styleUrls: ['./check-box-editor.component.css']
})
@RegisterEditor(EditorType.CheckBox)
export class CheckBoxEditorComponent extends AbstractEditorComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}