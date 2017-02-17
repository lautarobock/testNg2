import { Component, OnInit, Injectable } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  title: string;
  text: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  ok() {
    this.activeModal.close();
  }

  cancel() {
    this.activeModal.dismiss();
  }

}

@Injectable()
export class ConfirmationDialog {

  constructor(private modalService: NgbModal) {}

  open(text: string, title: string = null) {
    let ref = this.modalService.open(ConfirmationDialogComponent);
    ref.componentInstance.text  = text;
    ref.componentInstance.title  = title;
    return ref.result;
  }
}


