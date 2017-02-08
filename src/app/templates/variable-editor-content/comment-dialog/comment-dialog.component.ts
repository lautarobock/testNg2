import { Component, OnInit, Injectable } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Value } from '../../../documents/documents.service';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent implements OnInit {

  value:Value;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  ok(comment) {
    this.value.updateComment(comment);
    this.activeModal.close();
  }

  cancel() {
    this.activeModal.dismiss();
  }
}

@Injectable()
export class CommentDialog {

  constructor(private modalService: NgbModal) {}

  open(value: Value) {
    let ref = this.modalService.open(CommentDialogComponent)
    ref.componentInstance.value  = value;
    return ref.result;
  }
}