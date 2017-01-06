import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';

@Component({
  selector: 'app-memo-editor',
  templateUrl: './memo-editor.component.html',
  styleUrls: ['./memo-editor.component.css']
})
@RegisterEditor(EditorType.Memo)
export class MemoEditorComponent extends AbstractEditorComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
