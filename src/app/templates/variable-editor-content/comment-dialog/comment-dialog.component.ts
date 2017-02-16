import { Component, OnInit, Injectable, Directive, ElementRef, Input, HostListener, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Value } from '../../../documents/value.model';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent implements OnInit {

  value:Value;
  readonly: boolean;
  @ViewChild('inputComment') inputComment: ElementRef;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(()=>this.inputComment.nativeElement.focus(),50);
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

  open(value: Value, readonly: boolean) {
    let ref = this.modalService.open(CommentDialogComponent)
    ref.componentInstance.value  = value;
    ref.componentInstance.readonly = readonly;
    return ref.result;
  }
}

@Directive({selector: '[open-comment]'})
export class OpenComment {
 
  @Input('open-comment') value: Value;
  @Input('readonly') readonly: boolean;

  constructor(el: ElementRef, private commentDialog: CommentDialog) {

  }

  @HostListener('click') onClick() {
    this.commentDialog.open(this.value, this.readonly).then(result => console.log('ok',result)).catch(reason => console.log('cancel',reason));
  }
}