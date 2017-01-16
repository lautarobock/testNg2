import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';

@Component({
  selector: 'app-well-view-editor',
  templateUrl: './well-view-editor.component.html',
  styleUrls: ['./well-view-editor.component.css']
})
@RegisterEditor(EditorType.WellView)
export class WellViewEditorComponent extends AbstractEditorComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
