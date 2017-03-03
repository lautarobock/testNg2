import { WithStringInitializer } from 'codelyzer/util/astQuery';
import { SessionEmitter } from './http/session-http.service';
import { LoginDialog } from './login/login-dialog/login-dialog.component';
import { Component, OnInit } from '@angular/core';
import { ToastyConfig } from 'ng2-toasty';
import { URLSearchParams } from "@angular/http";
import { Document } from './documents/documents.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  documents: Array<any> = [];
  activeIdx: string;

  constructor(
    private toastyConfig: ToastyConfig, 
    private loginDialog: LoginDialog, 
    sessionEmitter :SessionEmitter
  ) {
    this.toastyConfig.theme = 'bootstrap';
    sessionEmitter.onExpire().subscribe(() => this.loginDialog.open().then(() => location.reload()).catch((err)=>console.log(err)));
  }

  ngOnInit() {
    let params = new URLSearchParams(window.location.search);
    if ( params.get('?documentId') && params.get('versionId') ) {
      this.open({
        documentId: params.get('?documentId'),
        versionId: params.get('versionId')
      })
    }
    console.log('params', params);
  }

  open(params) {
    let idx = this.documents.findIndex(p => p.documentId === params.documentId && p.versionId === params.versionId);
    if ( idx === -1 ) {
      params.idx = Math.random().toString();
      this.documents.push(params);
      idx = this.documents.length-1;
    }
    this.activeIdx = this.documents[idx].idx;
  }

  loadDocument(document: Document, documentIndex: number) {
    if ( !this.documents[documentIndex].name ) {
      this.documents[documentIndex].name = document.documentName;
    }
  }

  closeTab(idx, documentIndex) {
    if (idx === this.activeIdx) {
        if (documentIndex === 0 && this.documents.length>1) {
            this.activeIdx = this.documents[1].idx;
        } else if (documentIndex === 0) {
            this.activeIdx = null;
        } else {
            this.activeIdx = this.documents[documentIndex - 1].idx;
        }
    }
    this.documents.splice(documentIndex,1);
  }

  login() {
    this.loginDialog.open().then(() => location.reload()).catch((err)=>console.log(err));
  }

}