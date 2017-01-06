import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  document: any = {};

  constructor(private route: ActivatedRoute, private _documentService: DocumentsService) { }

  ngOnInit() {
    this.route.params
    .switchMap((params:Params) => this._documentService.get(+params['id']))
    .subscribe(data => this.document = data);
  }

}
