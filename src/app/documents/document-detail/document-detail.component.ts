import { Component, Input, OnInit, Directive, ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DocumentsService } from '../documents.service';
import { Values } from '../values.model';
import { Document, DocumentStatus } from '../documents.model';
import { SaveDocumentDialog } from '../save-document-dialog/save-document-dialog.component';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DocumentStatusDialog } from '../document-status/document-status.component';
import * as _ from 'lodash';


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
  selectedScenario: any;
  selectedRevision: any;
  revisions: Array<any>;
  saving: boolean = false;
  hideAlert: boolean = false;
  status: DocumentStatus = new DocumentStatus();


  constructor(
    private _documentService: DocumentsService,
    private saveDocumentDialog: SaveDocumentDialog,
    private toastyService: ToastyService,
    private loadingService: SlimLoadingBarService,
    private documentStatusDialog: DocumentStatusDialog
  ) { }

  ngOnInit() {
    this.selectedRevision = RevisionList.LASTEST;
    this.loadDocument();
  }

  ngOnDestroy() {
    if (this.document.hasExclusiveLock) {
      this.loadingService.start();
      this._documentService.release(this.document).subscribe(result => this.loadingService.complete());
    }
  }

  loadDocument() {
    this.loadingService.start();
    this._documentService.get(this.documentId, this.versionId, this.selectedRevision.revision)
      .subscribe((documentData: Document) => {
        this.document = this.postProcess(documentData);
        this.selectedScenario = _.find(this.document.conceptDefinition.concepts, (concept: any) => concept.name === this.document.conceptDefinition.currentConceptName);
        this.revisions = new RevisionList(this.document.revisions);
        this.selectedRevision = this.revisions.find(rev => rev.revision === this.selectedRevision.revision);
        let allVariables = this.document.templateVariables.map(variable => variable.id);
        this.loadingService.progress = 33;
        this._documentService.variables(this.document.documentId, this.document.versionId, this.selectedScenario.name, this.selectedRevision.revision, allVariables)
          .subscribe((data: any) => {
            this.loadingService.progress = 66;
            this.data = new Values(data.data);
            this._documentService.status(this.document, this.selectedScenario.name, this.selectedRevision.revision).toPromise()
              .then(data => this.status = new DocumentStatus(data.activeWorkflows, data.issues))
              .then(() => this.loadingService.complete());
            //Only subscribe to events if it is not readonly
            if (this.selectedRevision.revision === -1) {
              this.data.changeVariables.subscribe(v => {
                this.loadingService.start();
                this._documentService.updateVariables(this.document, v, this.selectedScenario.name).toPromise()
                  .then(data => this.data.update(data, true))
                  .then(() => this.loadingService.complete());
              });
              this.data.changeVariable.subscribe(v => {
                this.loadingService.start();
                this._documentService.updateFields(this.document, v, this.selectedScenario.name).toPromise()
                  .then(data => this.data.update(data, true))
                  .then(() => this.loadingService.complete());
              });
              this.data.changeComment.subscribe(v => {
                this.loadingService.start();
                this._documentService.updateComment(this.document, this.selectedScenario.name, v.variableId, v.comment, v.period, v.lookup).toPromise()
                  .then(data => this.data.update([data]))
                  .then(() => this.loadingService.complete());
              });
              this.data.changeExpression.subscribe(v => {
                this.loadingService.start();
                this._documentService.updateExpression(this.document, this.selectedScenario.name, v.variableId, v.expression).toPromise()
                  .then(data => this.data.update(data, true))
                  .then(() => this.loadingService.complete());
              });
            }
          });
      });
  }

  postProcess(doc: Document) {
    doc.variableDefinitions = _.keyBy(doc.templateVariables, 'id');
    doc.readonly = !doc.hasExclusiveLock;
    return doc;
  }

  save() {
    this.saveDocumentDialog.open(this.document)
      .then(result => {
        this.loadingService.start();
        this.saving = true;
        return result;
      })
      .then(result => this._documentService.save(this.document, result.text, result.tags).toPromise())
      .then(result => {
        this.data.clearDirties();
        this.loadingService.complete();
        this.saving = false;
        this.toastyService.success('Document Saved!');
      })
      .catch(err => {
        this.loadingService.reset();
        this.saving = false;
        if (err) {
          this.toastyService.error(err.message);
        }
      });
  }

  changeScenario() {
    this.loadingService.start();
    let allVariables = this.document.templateVariables.map(variable => variable.id);
    this._documentService.variables(this.document.documentId, this.document.versionId, this.selectedScenario.name, -1, allVariables)
      .subscribe((data: any) => {
        this.data.update(data.data);
        this.data.clearDirties();
        this.loadingService.complete();
      });
  }

  changeRevision() {
    this.document = <Document>{};
    this.data = null;
    this.selectedScenario = null;
    this.revisions = null;
    this.loadDocument();
  }

  showStatus() {
    this.documentStatusDialog.open(this.document, this.status);
  }
}

class RevisionList extends Array {

  public static readonly LASTEST = {
    description: '<Latest>',
    revision: -1
  };

  constructor(list: Array<any>) {
    super(list.length + 1);
    this.push(RevisionList.LASTEST);
    Array.prototype.push.apply(this, list);
  }
}