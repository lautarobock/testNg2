import { Component, Input, OnInit, Directive,ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DocumentsService, Document, Values } from '../documents.service';
import { SaveDocumentDialog } from '../save-document-dialog/save-document-dialog.component';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
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
  selectedScenario: any;
  selectedRevision: any;
  revisions: Array<any>;

  constructor(
    private _documentService: DocumentsService, 
    private saveDocumentDialog: SaveDocumentDialog, 
    private toastyService: ToastyService,
    private loadingService: SlimLoadingBarService
  ) { }

  ngOnInit() {
    this.loadingService.start();
    this._documentService.get(this.documentId, this.versionId)
    .subscribe((documentData: Document) => {
      this.document = this.postProcess(documentData);
      this.selectedScenario = _.find(this.document.conceptDefinition.concepts, (concept:any) => concept.name === this.document.conceptDefinition.currentConceptName);
      this.revisions = new RevisionList(this.document.revisions);
      this.selectedRevision = this.revisions[0];
      let allVariables = this.document.templateVariables.map(variable => variable.id);
      this.loadingService.progress = 50;
      this._documentService.variables(this.document.documentId,this.document.versionId,this.selectedScenario.name,this.selectedRevision.revision,allVariables)
      .subscribe((data: any) =>{
        this.loadingService.complete();
        this.data = new Values(data.data);
        this.data.changeVariable.subscribe(v=> {
          this.loadingService.start();
          this._documentService.updateFields(this.document,v,this.selectedScenario.name).toPromise()
            .then(data => this.data.update(data))
            .then(() => this.loadingService.complete());
        });
        this.data.changeComment.subscribe(v=> {
          this.loadingService.start();
          this._documentService.updateComment(this.document,this.selectedScenario.name,v.variableId,v.comment).toPromise()
            .then(data=> this.data.update([data]))
            .then(() => this.loadingService.complete());
        });
        this.data.changeExpression.subscribe(v=>{
          this.loadingService.start();
          this._documentService.updateExpression(this.document,this.selectedScenario.name, v.variableId,v.expression).toPromise()
            .then(data=> this.data.update(data))
            .then(() => this.loadingService.complete());
        });
      })
    });
  }

  ngOnDestroy() {
    if ( this.document.hasExclusiveLock ) {
      this.loadingService.start();
      this._documentService.release(this.document).subscribe(result => this.loadingService.complete());
    }
  }

  postProcess(doc: Document) {
    doc.variableDefinitions = _.keyBy(doc.templateVariables,'id');
    doc.readonly = !doc.hasExclusiveLock;
    return doc;
  }

  save() {
    this.saveDocumentDialog.open(this.document)
    .then(result => {
      this.loadingService.start();
      return result;
    })
    .then(result => this._documentService.save(this.document, result.text, result.tags).toPromise())
    .then(result => {
      this.data.clearDirties();
      this.loadingService.complete();
      this.toastyService.success('Document Saved!'  );
    })
    .catch(err => {
      this.loadingService.reset();
      this.toastyService.error(err.message);
    });
  }

  changeScenario() {
    this.loadingService.start();
    let allVariables = this.document.templateVariables.map(variable => variable.id);
    this._documentService.variables(this.document.documentId,this.document.versionId,this.selectedScenario.name,-1,allVariables)
      .subscribe((data: any) =>{
        this.data.update(data.data);
        this.loadingService.complete();
      });
  }

  changeRevision() {
    this.document = <Document>{};
    this.data = null;
    this.selectedScenario = null;
    this.revisions = null;
    this._documentService.get(this.documentId, this.versionId, this.selectedRevision.revision)
    .subscribe((documentData: Document) => {
      this.document = this.postProcess(documentData);
      this.selectedScenario = _.find(this.document.conceptDefinition.concepts, (concept:any) => concept.name === this.document.conceptDefinition.currentConceptName);
      this.revisions = new RevisionList(this.document.revisions);
      this.selectedRevision = this.revisions.find(rev => rev.revision === this.selectedRevision.revision);
      let allVariables = this.document.templateVariables.map(variable => variable.id);
      this._documentService.variables(this.document.documentId,this.document.versionId,this.selectedScenario.name,this.selectedRevision.revision,allVariables)
      .subscribe((data: any) =>{
        this.data = new Values(data.data);
        //TODO do not subscribe if is a readonly revision
        this.data.changeVariable.subscribe(v=> {
          this._documentService.updateFields(this.document,v,this.selectedScenario.name).subscribe(data=> this.data.update(data));
        });
        this.data.changeComment.subscribe(v=> {
          this._documentService.updateComment(this.document,this.selectedScenario.name,v.variableId,v.comment)
          .subscribe(data=> this.data.update([data]));
        });
        this.data.changeExpression.subscribe(v=>{
          this._documentService.updateExpression(this.document,this.selectedScenario.name, v.variableId,v.expression)
          .subscribe(data=> this.data.update(data));
        });
      })
    });
  }
}

class RevisionList extends Array {
  
  public static readonly LASTEST = {
      description: '<Latest>',
      revision: -1
  };

  constructor(list: Array<any>) {
    super(list.length+1);
    this.push(RevisionList.LASTEST);
    Array.prototype.push.apply(this,list);
  }
}