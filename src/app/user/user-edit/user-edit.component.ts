import { Component, OnInit, Injectable } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  public user: any;
  private groups: any[];

  constructor(
    public dialogRef: MdDialogRef<UserEditComponent>,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this._userService.groups().subscribe(data=>this.groups = data);
  }

}

@Injectable()
export class UserEditDialog {
  constructor (private dialog: MdDialog) {}

  public open(user) {
    var dialog = this.dialog.open(
      UserEditComponent,{
        width: '80%',
        // height: '90%'
      }
    );
    dialog.componentInstance.user = user;
  }
}