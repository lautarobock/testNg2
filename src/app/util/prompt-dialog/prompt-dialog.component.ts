import { Component, OnInit, Injectable, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-prompt-dialog',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.css']
})
export class PromptDialogComponent implements OnInit {

  @ViewChild('input') input: ElementRef;
  title: string;
  text: string = '';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    setTimeout(()=>this.input.nativeElement.focus(),50);
  }

  ok() {
    this.activeModal.close(this.text);
  }

  cancel() {
    this.activeModal.dismiss();
  }

}

@Injectable()
export class PromptDialog {

  constructor(private modalService: NgbModal) {}

  open(title: string, defaultText: string = '') {
    let ref = this.modalService.open(PromptDialogComponent);
    ref.componentInstance.text  = defaultText;
    ref.componentInstance.title  = title;
    return ref.result;
  }
}