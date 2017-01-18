import { Component, OnInit } from '@angular/core';
import { Config } from '../../../config/config';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.css']
})
@RegisterEditor(EditorType.Image)
export class ImageEditorComponent extends AbstractEditorComponent implements OnInit {

  constructor(private _config: Config) { 
    super();
  }

  ngOnInit() {}

  url() {
    //TODO, read size of json properties, and zoom feature
    let image = this.value().safe();
    let width = (<any>this.parent).width() || 600;
    let height = (<any>this.parent).height() || 600;
    return image ? this._config.get('apiPath') + `/file/image/${image.attachmentId}?imageWidth=${height}&imageHeight=${width}` : null;
  }

}
