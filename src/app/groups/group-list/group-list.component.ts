import { Component, OnInit } from '@angular/core';
import { MdSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  groups: any[];

  constructor(
    private _service: GroupService,
    private router: Router,
    private _snackbar: MdSnackBar
  ) { }

  ngOnInit() {
    this._service.all().subscribe(
      data => this.groups = data,
      err => this._snackbar.open(err.statusText,'Close')
    );
  }

  edit(group) {
    this.router.navigate(['/groups', group.workgroupId]);
  }

}
