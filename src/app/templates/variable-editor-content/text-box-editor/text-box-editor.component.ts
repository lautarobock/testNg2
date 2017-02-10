import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';

@Component({
  selector: 'app-text-box-editor',
  templateUrl: './text-box-editor.component.html',
  styleUrls: ['./text-box-editor.component.css']
})
@RegisterEditor(EditorType.TextBox)
export class TextBoxEditorComponent extends AbstractEditorComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
    
  }

}
