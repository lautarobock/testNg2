import { Component, Input, OnInit, Directive,ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DocumentsService, Document, Values } from '../documents.service';
// import * as _ from "lodash";


@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  document: Document = <Document>{};
  data: Values;

  constructor(private route: ActivatedRoute, private _documentService: DocumentsService) { }

  ngOnInit() {
    this.route.params
    .switchMap((params:Params) => this._documentService.get(+params['id']))
    .subscribe((documentData: Document) => {
      let allVariables = [];
      this.document = this.postProcess(documentData, allVariables);
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

  postProcess(doc: Document, allVariables) {
    // doc.variableDefinitions = _.keyBy(doc.templateVariables,'id');
    doc.variableDefinitions = {};
    doc.templateVariables.forEach(function(variable) {
      doc.variableDefinitions[variable.id] = variable;
      allVariables.push(variable.id);
    });
    return doc;
  }
}


