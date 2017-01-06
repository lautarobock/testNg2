import { Component, OnInit } from '@angular/core';
import { AbstractContentComponent, ContentType } from '../abstract-content';
import { RegisterTemplate } from '../template-loader.directive';

@Component({
  selector: 'app-variable-editor-content',
  templateUrl: './variable-editor-content.component.html',
  styleUrls: ['./variable-editor-content.component.css']
})
@RegisterTemplate(ContentType.VariableEditor)
export class VariableEditorContentComponent extends AbstractContentComponent implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
  }

}
