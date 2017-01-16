import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';

@Component({
  selector: 'app-web-view-editor',
  templateUrl: './web-view-editor.component.html',
  styleUrls: ['./web-view-editor.component.css']
})
@RegisterEditor(EditorType.Visualization)
export class WebViewEditorComponent extends AbstractEditorComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
