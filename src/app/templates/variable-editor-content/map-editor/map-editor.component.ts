import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';

@Component({
  selector: 'app-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.css']
})
@RegisterEditor(EditorType.Map)
export class MapEditorComponent extends AbstractEditorComponent implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
  }

}
