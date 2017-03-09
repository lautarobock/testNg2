import { WithStringInitializer } from 'codelyzer/util/astQuery';
import { SessionEmitter } from './http/session-http.service';
import { LoginDialog } from './login/login-dialog/login-dialog.component';
import { Component, OnInit } from '@angular/core';
import { ToastyConfig } from 'ng2-toasty';
import { URLSearchParams } from "@angular/http";
import { Document } from './documents/documents.model';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  documents: Array<any> = [];
  activeIdx: string;
  params: URLSearchParams;

  constructor(
    private toastyConfig: ToastyConfig, 
    private loginDialog: LoginDialog, 
    sessionEmitter :SessionEmitter,
    private hotkeysService: HotkeysService
  ) {
    this.toastyConfig.theme = 'bootstrap';
    sessionEmitter.onExpire().subscribe(() => this.loginDialog.open().then(() => location.reload()).catch((err)=>console.log(err)));
    this.hotkeysService.add(new Hotkey('alt+w', () => {
        this.closeCurrent();
        return false; // Prevent bubbling
    }));
    this.params = new URLSearchParams(window.location.hash.slice(1));
  }

  ngOnInit() {
    if ( this.params.get('documentId') && this.params.get('versionId') ) {
      this.open({
        documentId: parseInt(this.params.get('documentId')),
        versionId: parseInt(this.params.get('versionId'))
      })
    }
    console.log('params', this.params);
  }

  open(params) {
    let idx = this.documents.findIndex(p => p.documentId === params.documentId && p.versionId === params.versionId);
    if ( idx === -1 ) {
      params.idx = Math.random().toString();
      this.documents.push(params);
      idx = this.documents.length-1;
    }
    this.setActiveIdx(idx);
  }

  setActiveIdx(documentIndex: number) {
    this.activeIdx = this.documents[documentIndex].idx;
    window.location.hash = `#documentId=${this.documents[documentIndex].documentId}&versionId=${this.documents[documentIndex].versionId}`;
  }

  clearActiveIdx() {
    this.activeIdx = null;
    window.location.hash = '';
  }

  loadDocument(document: Document, documentIndex: number) {
    if ( !this.documents[documentIndex].name ) {
      this.documents[documentIndex].name = document.documentName;
    }
  }

  closeCurrent() {
    let index = this.documents.findIndex(p => p.idx === this.activeIdx);
    this.closeTab(this.activeIdx,index);
  }

  closeTab(idx, documentIndex) {
    if (idx === this.activeIdx) {
        if (documentIndex === 0 && this.documents.length>1) {
            this.setActiveIdx(1);
        } else if (documentIndex === 0) {
            this.clearActiveIdx();
        } else {
            this.setActiveIdx(documentIndex - 1);
        }
    }
    this.documents.splice(documentIndex,1);
  }

  login() {
    this.loginDialog.open().then(() => location.reload()).catch((err)=>console.log(err));
  }

}