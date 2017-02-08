import {Component, Optional, OnInit} from '@angular/core';
import {Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isDarkTheme: boolean = false;

  constructor(public http: Http) {
  }

  ngOnInit() {
    
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