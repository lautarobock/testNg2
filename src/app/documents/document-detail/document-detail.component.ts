import { Component, Input, OnInit, Directive,ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DocumentsService, Document, Values } from '../documents.service';
import * as _ from "lodash";


@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  @Input() variableId: number;
  document: Document = <Document>{};
  data: Values;

  constructor(private _documentService: DocumentsService) { }

  ngOnInit() {
    this._documentService.get(this.variableId)
    .subscribe((documentData: Document) => {
      this.document = this.postProcess(documentData);
      let allVariables = this.document.templateVariables.map(variable => variable.id);
      this._documentService.variables(this.document.documentId,1,'Default',-1,allVariables)
      .subscribe((data: any) =>{
        this.data = new Values(data.data);
        this.data.changeVariable.subscribe(v=> {
          this._documentService.updateFields(this.document,v,'Default')
          .subscribe(data=> this.data.update(data));
        });
        this.data.changeComment.subscribe(v=> {
          this._documentService.updateComment(this.document,'Default',v.variableId,v.comment)
          .subscribe(data=> this.data.update([data]));
        });
      })
    });
  }

  ngOnDestroy() {
    console.log('DESTROY', this.variableId);
  }

  postProcess(doc: Document) {
    doc.variableDefinitions = _.keyBy(doc.templateVariables,'id');
    return doc;
  }
}

@Component({
  selector: 'app-document-detail-route',
  template: '<app-document-detail [variableId]="variableId"></app-document-detail>'
})
export class DocumentDetailRouteDecorator {

  variableId:number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.variableId=(+params['id']));
  }
}