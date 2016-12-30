import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  all() {
    return this.http.get('/api/users').map(res => res.json());
  }
  

}
