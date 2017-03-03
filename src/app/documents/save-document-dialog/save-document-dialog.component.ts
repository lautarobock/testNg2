import { Component, OnInit, Injectable, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Document } from '../documents.model';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'app-save-document-dialog',
  templateUrl: './save-document-dialog.component.html',
  styleUrls: ['./save-document-dialog.component.css']
})
export class SaveDocumentDialogComponent implements OnInit {

  @ViewChild('inputText') inputText: ElementRef;
  text: string = '';
  document: Document;

  constructor(
    public activeModal: NgbActiveModal,
    private hotkeysService: HotkeysService
  ) {
    this.hotkeysService.add(new Hotkey('ctrl+enter', (event: KeyboardEvent): boolean => {
        this.ok();
        return false; // Prevent bubbling
    }));
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(()=>this.inputText.nativeElement.focus(),50);
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
    let ref = this.modalService.open(SaveDocumentDialogComponent);
    ref.componentInstance.document  = document;
    return ref.result;
  }
}