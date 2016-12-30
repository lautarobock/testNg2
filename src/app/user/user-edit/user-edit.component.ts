import { Component, OnInit, Injectable } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  public user: any;

  constructor(public dialogRef: MdDialogRef<UserEditComponent>) {}

}

@Injectable()
export class UserEditDialog {
  constructor (private dialog: MdDialog) {}

  public open(user) {
    var dialog = this.dialog.open(UserEditComponent);
    dialog.componentInstance.user = user;
  }
}