import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { Config } from '../../../config/config';

@Component({
  selector: 'app-attachment-editor',
  templateUrl: './attachment-editor.component.html',
  styleUrls: ['./attachment-editor.component.css']
})
@RegisterEditor(EditorType.Attachment)
export class AttachmentEditorComponent extends AbstractEditorComponent implements OnInit {

  private _variableId = null;
  public uploader:FileUploader = new FileUploader({
    url: this.config.get('apiPath') + '/file/upload',
    autoUpload: true
  });
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  private uploadedFiles = [];

  constructor(private config: Config) { 
    super();
  }

  ngOnInit() {
    this._variableId = this.editor.variableIds.find(variableId => this.data.get(variableId) && this.data.get(variableId).dataType() === 'Attachment');
    this.uploader.onAfterAddingAll = () => {
      this.uploadedFiles = [];
    };
    this.uploader.onCompleteItem = (item:FileItem, response:string, status:number, headers:ParsedResponseHeaders) => {
      var data = eval('('+response+')');
      this.uploadedFiles.push({
        fullName: item.file.name,
        fileName: item.file.name,
        attachmentId: data.FileNameOrId,
        saveInDB: true,
        hideFullPath: false,
        isWebLink: false
      })
      // console.log('FINISHED');
      // console.log('item',item);
      // console.log('response', response);
      // console.log('status', status);
      // console.log('headers', headers);
    };
    this.uploader.onCompleteAll = () => {
      this.value().update(this.uploadedFiles);
    };
  }
  
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}
