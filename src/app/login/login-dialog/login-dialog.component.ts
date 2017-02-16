import { Component, OnInit, Injectable, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Http } from '@angular/http';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  @ViewChild('usernameInput') inputText: ElementRef;
  username: string;
  password: string;
  error: string = null;
  constructor(public activeModal: NgbActiveModal, private http: Http) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(()=>this.inputText.nativeElement.focus(),50);
  }

  ok() {
    this.error = null;
    this.http.post('/api/authentication/logon?sso=false',{
        "UserName": this.username,
        "Password": this.password,
        "UseWindowsAuthentication": false
    })
    .map(res => res.json())
    .subscribe(
      data => {
        if ( data.displayName ) {
          this.activeModal.close(data);
        } else {
          this.error = data;
        }
      },
      err => this.error = err
    );
    ;
  }

  cancel() {
    this.activeModal.dismiss('cancel');
  }
}

@Injectable()
export class LoginDialog {

  constructor(private modalService: NgbModal) {}

  open() {
    return this.modalService.open(LoginDialogComponent).result;
  }
}