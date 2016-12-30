import { Component, OnInit } from '@angular/core';
import { MdSnackBar} from '@angular/material';
import { UserService } from '../user.service';
import { UserEditComponent, UserEditDialog } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[];

  constructor(
    private _service: UserService, 
    private _editDialog: UserEditDialog,
    private _snackbar: MdSnackBar
  ) { }

  ngOnInit() {
    this._service.all().subscribe(
      data => this.users = data,
      err => this._snackbar.open(err.statusText,'Close')
    );
  }

  editUser(user) {
    console.log(user);
    this._editDialog.open(user);
  }

}
