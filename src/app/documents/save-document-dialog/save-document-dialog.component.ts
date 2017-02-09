import { Component, OnInit, Injectable } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Document } from '../documents.service';

@Component({
  selector: 'app-save-document-dialog',
  templateUrl: './save-document-dialog.component.html',
  styleUrls: ['./save-document-dialog.component.css']
})
export class SaveDocumentDialogComponent implements OnInit {

  text: string = '';
  document: Document;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  ok() {
    this.activeModal.close({
      comment: this.text,
      tags: []
    });
  }

  cancel() {
    this.activeModal.dismiss();
  }

}

@Injectable()
export class SaveDocumentDialog {

  constructor(private modalService: NgbModal) {}

  open(document: Document) {
    let ref = this.modalService.open(SaveDocumentDialogComponent)
    ref.componentInstance.document  = document;
    return ref.result;
  }
}