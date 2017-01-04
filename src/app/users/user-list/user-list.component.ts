import { Component, OnInit } from '@angular/core';
import { MdSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[];

  constructor(
    private _service: UserService, 
    private router: Router,
    private _snackbar: MdSnackBar
  ) { }

  ngOnInit() {
    this._service.all().subscribe(
      data => this.users = data,
      err => this._snackbar.open(err.statusText,'Close')
    );
  }

  edit(user) {
    console.log(user);
    this.router.navigate(['/users', user.userId]);
  }

}
