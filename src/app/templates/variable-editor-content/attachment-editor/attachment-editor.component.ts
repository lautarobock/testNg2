import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';

@Component({
  selector: 'app-attachment-editor',
  templateUrl: './attachment-editor.component.html',
  styleUrls: ['./attachment-editor.component.css']
})
@RegisterEditor(EditorType.Attachment)
export class AttachmentEditorComponent extends AbstractEditorComponent implements OnInit {

  private _variableId = null;

  constructor() { 
    super();
  }

  ngOnInit() {
    this._variableId = this.editor.variableIds.find(variableId => this.data.get(variableId) && this.data.get(variableId).dataType() === 'Attachment');
  }
  
}
