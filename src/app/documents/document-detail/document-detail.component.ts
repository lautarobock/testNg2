import { Component, Input, OnInit, Directive,ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DocumentsService, Document, Values } from '../documents.service';
import { SaveDocumentDialog } from '../save-document-dialog/save-document-dialog.component';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import * as _ from "lodash";


@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  @Input() documentId: number;
  @Input() versionId: number;
  document: Document = <Document>{};
  data: Values;

  constructor(
    private _documentService: DocumentsService, 
    private saveDocumentDialog: SaveDocumentDialog, 
    private toastyService: ToastyService
  ) { }

  ngOnInit() {
    this._documentService.get(this.documentId, this.versionId)
    .subscribe((documentData: Document) => {
      this.document = this.postProcess(documentData);
      let allVariables = this.document.templateVariables.map(variable => variable.id);
      this._documentService.variables(this.document.documentId,this.document.versionId,'Default',-1,allVariables)
      .subscribe((data: any) =>{
        this.data = new Values(data.data);
        this.data.changeVariable.subscribe(v=> {
          this._documentService.updateFields(this.document,v,'Default')
          .subscribe(data=> this.data.update(data));
        });
        this.data.changeComment.subscribe(v=> {
          this._documentService.updateComment(this.document,'Default',v.documentId,v.comment)
          .subscribe(data=> this.data.update([data]));
        });
      })
    });
  }

  ngOnDestroy() {
    console.log('DESTROY', this.documentId);
    if ( this.document.hasExclusiveLock ) {
        this._documentService.release(this.document).subscribe(result => console.log('document released', result));
    }
  }

  postProcess(doc: Document) {
    doc.variableDefinitions = _.keyBy(doc.templateVariables,'id');
    return doc;
  }

  save() {
    this.saveDocumentDialog.open(this.document)
    .then(result => this._documentService.save(this.document, result.text, result.tags).toPromise())
    .then(result => {
      this.toastyService.success({
        title: 'Save',
        msg: 'Document Saved!',
        timeout: 1000
      });
    });
  }
}

// @Component({
//   selector: 'app-document-detail-route',
//   template: '<app-document-detail [documentId]="documentId"></app-document-detail>'
// })
// export class DocumentDetailRouteDecorator {

//   documentId:number;

//   constructor(private route: ActivatedRoute) { }

//   ngOnInit() {
//     this.route.params.subscribe((params: Params) => this.documentId=(+params['id']));
//   }
// }