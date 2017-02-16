import { Component, Optional, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ToastyConfig } from 'ng2-toasty';
import { LoginDialog } from './login/login-dialog/login-dialog.component';
import { SessionEmitter } from './http/session-http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  documents: Array<any> = [];
  activeIdx: string;

  constructor(private toastyConfig: ToastyConfig, private loginDialog: LoginDialog, sessionEmitter:SessionEmitter) {
    this.toastyConfig.theme = 'bootstrap';
    sessionEmitter.onExpire().subscribe(() => this.loginDialog.open().then(() => location.reload()).catch((err)=>console.log(err)));
  }

  ngOnInit() {
    
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