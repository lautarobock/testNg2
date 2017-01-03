import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog, MdDialogRef} from '@angular/material';
import { UserService, User } from '../user.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = <User>{};
  private groups: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this._userService.groups().subscribe(data=>this.groups = data);
    this.route.params
    .switchMap((params:Params) => this._userService.get(+params['id']))
    .subscribe((data: User) => this.user = data);
  }

}