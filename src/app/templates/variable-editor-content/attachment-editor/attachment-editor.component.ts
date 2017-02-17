import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { Config } from '../../../config/config';
import { ConfirmationDialog } from '../../../util/confirmation-dialog/confirmation-dialog.component';
import { PromptDialog } from '../../../util/prompt-dialog/prompt-dialog.component';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import * as _ from 'lodash';

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

  constructor(private config: Config, private confirmationDialog: ConfirmationDialog, private promptDialog: PromptDialog, private toastyService: ToastyService) { 
    super();
  }

  ngOnInit() {
    this._variableId = this.editor.variableIds.find(variableId => this.data.get(variableId) && this.data.get(variableId).dataType() === 'Attachment');
    this.uploader.onAfterAddingAll = () => {
      this.uploadedFiles = [];
    };
    this.uploader.onCompleteItem = (item:FileItem, response:string, status:number, headers:ParsedResponseHeaders) => {
      let data = eval('('+response+')');
      this.uploadedFiles.push({
        fullName: item.file.name,
        fileName: item.file.name,
        attachmentId: data.FileNameOrId,
        saveInDB: true,
        hideFullPath: false,
        isWebLink: false
      });
    };
    this.uploader.onCompleteAll = () => {
      let prev = this.value(this._variableId).safe() || [];
      let all = prev.concat(this.uploadedFiles);
      this.value(this._variableId).update(new AttachmentsSerializer(all).toXML());
      this.toastyService.success({
        title: 'Upload Successful',
        msg: 'Document Uploaded Successfuly',
        timeout: 2000
      });
    };
  }

  uploadFiles($event) {
    console.log($event.srcElement.files);
  }
  
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  saveLink() {
    this.promptDialog.open('Save Link','http://')
      .then( (link) => {
        let files = this.value(this._variableId).safe();
        files.push({
          fullName: link,
          fileName: link,
          attachmentId: null,
          saveInDB: false,
          hideFullPath: false,
          isWebLink: true
        });
        this.value(this._variableId).update(new AttachmentsSerializer(files).toXML());
      })
      .catch( () => console.log('cancel'));
  }

  downloadURL (file) {
      return this.config.get('apiPath') + `/file/download/${file.attachmentId}?fileName=${file.fileName}`;
  };

  removeFile(file) {
    this.confirmationDialog.open(`Are you sure to remove "${file.fileName}?"`,'Remove file')
      .then( () => {
        let files = this.value(this._variableId).safe();
        if (file.saveInDB) {
          _.remove(files, (item: any) => item.attachmentId === file.attachmentId);
        } else if ( file.isWebLink ) {
          _.remove(files, (item: any) => item.fileName === file.fileName);
        }
        this.value(this._variableId).update(new AttachmentsSerializer(files).toXML());
      })
      .catch( () => console.log('no'));
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
      return fileXML;
    }).join('');
    xml += ' </Attachments>';
    return xml;
  }
}