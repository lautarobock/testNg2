import { HierarchyService, TagType } from '../../hierarchy/hierarchy.service';
import { Component, OnInit, Injectable, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Document } from '../documents.model';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import * as _ from 'lodash';

@Component({
  selector: 'app-save-document-dialog',
  templateUrl: './save-document-dialog.component.html',
  styleUrls: ['./save-document-dialog.component.css']
})
export class SaveDocumentDialogComponent implements OnInit {

  @ViewChild('inputText') inputText: ElementRef;
  text: string = '';
  document: Document;
  tags: any[];
  tagsApplied = [];
  selectedTag = null;

  constructor(
    public activeModal: NgbActiveModal,
    private hotkeysService: HotkeysService,
    private hierarchyService: HierarchyService
  ) {
    this.hotkeysService.add(new Hotkey('ctrl+enter', (event: KeyboardEvent): boolean => {
        this.ok();
        return false; // Prevent bubbling
    }));
  }

  ngOnInit() {
    this.hierarchyService.tags(TagType.Revision).subscribe(tags => this.tags = tags);
  }

  ngAfterViewInit() {
    setTimeout(()=>this.inputText.nativeElement.focus(),50);
  }

  onSelect(tag) {
    this.tagsApplied.push(tag);
    _.remove(this.tags, tag);
  }

  removeTag(idx) {
    let tag = this.tagsApplied.splice(idx,1);
    this.tags.push(tag[0]);
  }

  ok() {
    this.activeModal.close({
      comment: this.text,
      tags: this.tagsApplied
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