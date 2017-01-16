import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';

@Component({
  selector: 'app-spreadsheet-editor',
  templateUrl: './spreadsheet-editor.component.html',
  styleUrls: ['./spreadsheet-editor.component.css']
})
@RegisterEditor(EditorType.Spreadsheet)
export class SpreadsheetEditorComponent extends AbstractEditorComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
