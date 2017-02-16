import { Component, OnInit, Injectable } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Document, DocumentStatus } from '../documents.model';

@Component({
  selector: 'app-document-status',
  templateUrl: './document-status.component.html',
  styleUrls: ['./document-status.component.css']
})
export class DocumentStatusComponent implements OnInit {

  document: Document;
  status: DocumentStatus;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}

@Injectable()
export class DocumentStatusDialog {

  constructor(private modalService: NgbModal) {}

  open(document: Document, status: DocumentStatus) {
    let ref = this.modalService.open(DocumentStatusComponent, {size: 'lg'})
    ref.componentInstance.document = document;
    ref.componentInstance.status = status;
    return ref.result;
  }
}