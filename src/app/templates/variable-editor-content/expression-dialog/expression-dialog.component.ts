import { Component, OnInit, Injectable, Directive, ElementRef, Input, HostListener, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Value } from '../../../documents/documents.service';

@Component({
  selector: 'app-expression-dialog',
  templateUrl: './expression-dialog.component.html',
  styleUrls: ['./expression-dialog.component.css']
})
export class ExpressionDialogComponent implements OnInit {

  value:Value;
  readonly: boolean;
  @ViewChild('inputExpression') inputExpression: ElementRef;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(()=>this.inputExpression.nativeElement.focus(),50);
  }

  ok(expression) {
    this.value.updateExpression(expression);
    this.activeModal.close();
  }

  cancel() {
    this.activeModal.dismiss();
  }

}

@Injectable()
export class ExpressionDialog {

  constructor(private modalService: NgbModal) {}

  open(value: Value, readonly: boolean) {
    let ref = this.modalService.open(ExpressionDialogComponent, {size: 'lg'});
    ref.componentInstance.value  = value;
    ref.componentInstance.readonly = readonly;
    return ref.result;
  }
}

@Directive({selector: '[open-expression]'})
export class ExpressionComment {
 
  @Input('open-expression') value: Value;
  @Input('readonly') readonly: boolean;

  constructor(el: ElementRef, private expressionDialog: ExpressionDialog) {

  }

  @HostListener('click') onClick() {
    this.expressionDialog.open(this.value, this.readonly).then(result => console.log('ok',result)).catch(reason => console.log('cancel',reason));
  }
}