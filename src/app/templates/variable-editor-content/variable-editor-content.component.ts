import { Component, OnInit, HostListener } from '@angular/core';
import { AbstractContentComponent, ContentType } from '../abstract-content';
import { RegisterTemplate } from '../template-loader.directive';

@Component({
  selector: 'app-variable-editor-content',
  templateUrl: './variable-editor-content.component.html',
  styleUrls: ['./variable-editor-content.component.css']
})
@RegisterTemplate(ContentType.VariableEditor)
export class VariableEditorContentComponent extends AbstractContentComponent implements OnInit {

  self: AbstractContentComponent;

  constructor() {
    super();
    this.self = this;
  }

  width() {
    return this.jsonProperties().Width;
  }

  height() {
    return this.jsonProperties().Height;
  }

  ngOnInit() {
  }

}
