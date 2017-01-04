import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GroupService, Group } from '../group.service';
import { UserService } from '../../users/users.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {
  group: any = <Group>{};
  users: any[];

  constructor(
    private route: ActivatedRoute,
    private _groupService: GroupService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this._userService.all().subscribe(data=>this.users = data);
    this.route.params
    .switchMap((params:Params) => this._groupService.get(+params['id']))
    .subscribe(data => this.group = data);
  }

}
