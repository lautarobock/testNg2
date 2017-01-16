import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';

@Component({
  selector: 'app-visualization-editor',
  templateUrl: './visualization-editor.component.html',
  styleUrls: ['./visualization-editor.component.css']
})
@RegisterEditor(EditorType.Visualization)
export class VisualizationEditorComponent extends AbstractEditorComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
