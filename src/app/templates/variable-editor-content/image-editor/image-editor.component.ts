import { Component, OnInit } from '@angular/core';
import { Config } from '../../../config/config';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';
import { ConfirmationDialog } from '../../../util/confirmation-dialog/confirmation-dialog.component';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.css']
})
@RegisterEditor(EditorType.Image)
export class ImageEditorComponent extends AbstractEditorComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({
    url: this.config.get('apiPath') + '/file/upload',
    autoUpload: true
  });
  public hasBaseDropZoneOver:boolean = false;
  private uploadedFiles = [];
  zoom:boolean = false;

  constructor(private config: Config, private confirmationDialog: ConfirmationDialog, private toastyService: ToastyService) { 
    super();
  }

  ngOnInit() {
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
      this.value().update(new AttachmentSerializer(this.uploadedFiles[0]).toXML());
      if ( this.uploadedFiles.length === 1) {
        this.toastyService.success({
          title: 'Upload Successful',
          msg: 'Document Uploaded Successfuly',
          timeout: 2000
        });
      } else {
        this.toastyService.warning({
          title: 'Upload finish',
          msg: 'Just the first document was loaded',
          timeout: 5000
        });
      }
    };
  }

  url(full:boolean) {
    //TODO, read size of json properties, and zoom feature
    if ( full ) {
      let image = this.value().safe();
      let width = (<any>this.parent).width() || 600;
      let height = (<any>this.parent).height() || 600;
      return image ? this.config.get('apiPath') + `/file/image/${image.attachmentId}?imageWidth=${height}&imageHeight=${width}` : null;
    } else {
      let image = this.value().safe();
      let width = (<any>this.parent).width() || 600;
      let height = (<any>this.parent).height() || 600;
      return image ? this.config.get('apiPath') + `/file/download/${image.attachmentId}?fileName==${image.fileName}` : null;
    }
  }
  

  remove() {
    this.confirmationDialog.open('Are you sure?', 'Remove Image')
      .then( () => {
        this.value().update(null);
      })
      .catch( () => console.log('no'));
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

}

class AttachmentSerializer {
  constructor(private file=null) {

  }

  toXML() {
    let xml = '<?xml version="1.0" encoding="utf-16"?><Attachment xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
    if (this.file&&this.file.fullName!==null) xml += `<FullName>${this.file.fullName}</FullName> `;
    if (this.file&&this.file.fileName !== null) xml += `<FileName>${this.file.fileName}</FileName> `;
    if (this.file&&this.file.saveInDB !== null) xml += `<SaveInDB>${this.file.saveInDB}</SaveInDB> `;
    if (this.file&&this.file.hideFullPath !== null) xml += `<HideFullPath>${this.file.hideFullPath}</HideFullPath> `;
    if (this.file&&this.file.attachmentId !== null) xml += `<AttachmentId>${this.file.attachmentId}</AttachmentId> `;
    if (this.file&&this.file.isWebLink !== null) xml += `<IsWebLink>${this.file.isWebLink}</IsWebLink> `;
    xml += '</Attachment>';
    return xml;
  }
}