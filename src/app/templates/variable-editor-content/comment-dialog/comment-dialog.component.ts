import { Component, OnInit, Injectable, Directive, ElementRef, Input, HostListener, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Value } from '../../../documents/value.model';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent implements OnInit {

  value:Value;
  readonly: boolean;
  index: number;
  @ViewChild('inputComment') inputComment: ElementRef;

  constructor(
    public activeModal: NgbActiveModal,
    private hotkeysService: HotkeysService
  ) {
    this.hotkeysService.add(new Hotkey('ctrl+enter', (event: KeyboardEvent): boolean => {
        this.ok(this.inputComment.nativeElement.value);
        return false; // Prevent bubbling
    }));
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(()=>this.inputComment.nativeElement.focus(),50);
  }

  ok(comment) {
    this.value.updateComment(comment,this.index);
    this.activeModal.close();
  }

  cancel() {
    this.activeModal.dismiss();
  }
}

@Injectable()
export class CommentDialog {

  constructor(private modalService: NgbModal) {}

  open(value: Value, readonly: boolean, index: number) {
    let ref = this.modalService.open(CommentDialogComponent);
    ref.componentInstance.value  = value;
    ref.componentInstance.readonly = readonly;
    ref.componentInstance.index = index;
    return ref.result;
  }
}

@Directive({selector: '[open-comment]'})
export class OpenComment {
 
  @Input('open-comment') value: Value;
  @Input('readonly') readonly: boolean;
  @Input('index') index: number;

  constructor(el: ElementRef, private commentDialog: CommentDialog) {

  }

  @HostListener('click',['$event']) onClick(event) {
    event.stopPropagation();
    this.commentDialog.open(this.value, this.readonly, this.index).then(result => console.log('ok',result)).catch(reason => console.log('cancel',reason));
  }
}