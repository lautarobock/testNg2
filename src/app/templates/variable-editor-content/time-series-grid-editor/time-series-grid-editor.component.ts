import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';

@Component({
  selector: 'app-time-series-grid-editor',
  templateUrl: './time-series-grid-editor.component.html',
  styleUrls: ['./time-series-grid-editor.component.css']
})
@RegisterEditor(EditorType.TimeSeriesGrid)
export class TimeSeriesGridEditorComponent extends AbstractEditorComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}