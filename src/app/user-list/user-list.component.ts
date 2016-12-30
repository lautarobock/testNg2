import { Component, OnInit } from '@angular/core';
import {Http, Response } from '@angular/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[];

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('/api/users')
          .map(res => res.json())
          .subscribe(
            data => this.users = data,
            err => console.log(err),
            () => console.log('User list Quote Complete')
          );
  }

  editUser(user) {
    console.log(user);
  }

}
