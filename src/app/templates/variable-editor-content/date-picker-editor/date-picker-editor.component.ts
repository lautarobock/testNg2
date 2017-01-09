import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';

@Component({
  selector: 'app-date-picker-editor',
  templateUrl: './date-picker-editor.component.html',
  styleUrls: ['./date-picker-editor.component.css']
})
@RegisterEditor(EditorType.DatePicker)
export class DatePickerEditorComponent extends AbstractEditorComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
