import {Component, Optional, OnInit, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ToastyConfig } from 'ng2-toasty';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isDarkTheme: boolean = false;

  documents: Array<any> = [];
  activeIdx: string;

  constructor(public http: Http, private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
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
    this.http.post('/api/authentication/logon?sso=false',{
        "UserName": "Administrator",
        "Password": "Administrator",
        "UseWindowsAuthentication": false
    })
    .map(res => res.json())
    .subscribe(
      data => console.log(data),
      err => console.log(err),
      () => {
        console.log('Authentication Complete');
      }
    );
  }

}