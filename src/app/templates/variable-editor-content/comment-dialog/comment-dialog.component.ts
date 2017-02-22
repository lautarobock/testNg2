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
  period: string;
  @ViewChild('inputComment') inputComment: ElementRef;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(()=>this.inputComment.nativeElement.focus(),50);
  }

  ok(comment) {
    this.value.updateComment(comment,this.period);
    this.activeModal.close();
  }

  cancel() {
    this.activeModal.dismiss();
  }
}

@Injectable()
export class CommentDialog {

  constructor(private modalService: NgbModal) {}

  open(value: Value, readonly: boolean, period: string) {
    let ref = this.modalService.open(CommentDialogComponent);
    ref.componentInstance.value  = value;
    ref.componentInstance.readonly = readonly;
    ref.componentInstance.period = period;
    return ref.result;
  }
}

@Directive({selector: '[open-comment]'})
export class OpenComment {
 
  @Input('open-comment') value: Value;
  @Input('readonly') readonly: boolean;
  @Input('period') period: string;

  constructor(el: ElementRef, private commentDialog: CommentDialog) {

  }

  @HostListener('click',['$event']) onClick(event) {
    event.stopPropagation();
    this.commentDialog.open(this.value, this.readonly, this.period).then(result => console.log('ok',result)).catch(reason => console.log('cancel',reason));
  }
}