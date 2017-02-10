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
    };
    this.uploader.onCompleteAll = () => {
      let all = this.value(this._variableId).safe().concat(this.uploadedFiles)
      this.value().update(new AttachmentsSerializer(all).toXML());
    };
  }
  
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

}

class AttachmentsSerializer {

  constructor(private files) {

  }

  toXML() {
    let xml = '<?xml version="1.0" encoding="utf-16"?> <Attachments xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> ';
    xml += this.files.map(file => {
      let fileXML = '<Attachment> ';
      if (file.fullName!==null) fileXML += `<FullName>${file.fullName}</FullName> `;
      if (file.fileName !== null) fileXML += `<FileName>${file.fileName}</FileName> `;
      if (file.saveInDB !== null) fileXML += `<SaveInDB>${file.saveInDB}</SaveInDB> `;
      if (file.hideFullPath !== null) fileXML += `<HideFullPath>${file.hideFullPath}</HideFullPath> `;
      if (file.attachmentId !== null) fileXML += `<AttachmentId>${file.attachmentId}</AttachmentId> `;
      if (file.isWebLink !== null) fileXML += `<IsWebLink>${file.isWebLink}</IsWebLink> `;
      fileXML += '</Attachment>';
      return fileXML
    }).join('');
    xml += ' </Attachments>';
    return xml;
  }
}