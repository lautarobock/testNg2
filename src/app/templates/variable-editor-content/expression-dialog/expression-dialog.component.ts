import { Component, OnInit, Injectable, Directive, ElementRef, Input, HostListener, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Value, Document, DocumentsService } from '../../../documents/documents.service';
import { MathService } from '../../../documents/math.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-expression-dialog',
  templateUrl: './expression-dialog.component.html',
  styleUrls: ['./expression-dialog.component.css']
})
export class ExpressionDialogComponent implements OnInit {

  value: Value;
  readonly: boolean;
  document: Document;
  scenario: any;
  error: any = {};
  functions: any[] = [];
  expression: string = '';
  @ViewChild('inputExpression') inputExpression: ElementRef;

  constructor(
    public activeModal: NgbActiveModal,
    private documentService: DocumentsService,
    private mathService: MathService,
    private toastyService: ToastyService
  ) { }

  ngOnInit() {
    this.mathService.functions().subscribe(data => this.functions = data);
    this.expression = this.value.expression();
  }

  ngAfterViewInit() {
    setTimeout(()=>this.inputExpression.nativeElement.focus(),50);
  }

  validate(expression: string) {
    this.onValid(expression)
    .then(() => this.toastyService.success('Validation Success!'))
    .catch(err=>console.log(err));
  }

  onValid(expression: string) {
    this.error = {};
    return new Promise((resolve, reject) => {
      this.documentService.validateExpression(this.document, this.scenario.name,this.value.variableId(), expression)
        .subscribe(result => {
          if ( result.severity === 'Error' ) {
            this.error = result;
            this.toastyService.error('Expression is not Valid!');
            reject();    
          } else {
            resolve();
          }
        });
    });  
  }

  addFn(fn) {
    let index = this.inputExpression.nativeElement.selectionStart;
    let to = this.inputExpression.nativeElement.selectionEnd;
    this.expression = [this.expression.slice(0, index), fn.expression, this.expression.slice(to)].join('');
    setTimeout(() => {
      let init = fn.expression.indexOf('_');
      this.inputExpression.nativeElement.focus();
      if (init !== -1) {
        this.inputExpression.nativeElement.setSelectionRange(index + init, index + init + 1);
      }
    },0);
    
  }

  add(arg) {
    let index = this.inputExpression.nativeElement.selectionStart;
    let to = this.inputExpression.nativeElement.selectionEnd;
    this.expression = [this.expression.slice(0, index), '[' + arg.prompt + ']', this.expression.slice(to)].join('');
    setTimeout(()=>this.inputExpression.nativeElement.focus(),50);
  }

  ok(expression) {
    this.onValid(expression)
    .then(()=>{
      this.value.updateExpression(expression);
      this.activeModal.close();
    })
    .catch(err=>console.log(err));
  }

  cancel() {
    this.activeModal.dismiss();
  }

}

@Injectable()
export class ExpressionDialog {

  constructor(private modalService: NgbModal) {}

  open(value: Value, readonly: boolean, document: Document, scenario: any) {
    let ref = this.modalService.open(ExpressionDialogComponent, {size: 'lg',windowClass: 'modal-xl'});
    ref.componentInstance.value  = value;
    ref.componentInstance.readonly = readonly;
    ref.componentInstance.document = document;
    ref.componentInstance.scenario = scenario;
    return ref.result;
  }
}

@Directive({selector: '[open-expression]'})
export class ExpressionComment {
 
  @Input('open-expression') value: Value;
  @Input('readonly') readonly: boolean;
  @Input('document') document: Document;
  @Input('scenario') scenario: any;

  constructor(el: ElementRef, private expressionDialog: ExpressionDialog) {

  }

  @HostListener('click') onClick() {
    this.expressionDialog.open(this.value, this.readonly, this.document, this.scenario).then(result => console.log('ok',result)).catch(reason => console.log('cancel',reason));
  }
}