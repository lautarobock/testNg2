import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  all() {
    return this.http.get('/api/users').map(res =>{
      var arr = res.json();
      arr.forEach(g=>g.expirationDate = new Date(g.expirationDate));
      return arr;
    });
  }
  
  groups() {
    return this.http.get('/api/workgroups').map(res => res.json());
  }

}
