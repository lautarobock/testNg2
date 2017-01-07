import { Component, Input, OnInit, Directive,ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DocumentsService, Document } from '../documents.service';
// import * as _ from "lodash";


@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  document: Document = <Document>{};

  constructor(private route: ActivatedRoute, private _documentService: DocumentsService) { }

  ngOnInit() {
    this.route.params
    .switchMap((params:Params) => this._documentService.get(+params['id']))
    .subscribe((data: Document) => this.document = this.postProcess(data));
  }

  postProcess(doc) {
    // doc.variableDefinitions = _.keyBy(doc.templateVariables,'id');
    return doc;
  }
}


