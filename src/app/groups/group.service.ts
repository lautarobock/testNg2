import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class GroupService {

  constructor(private http: Http) { }

  all() {
    return this.http.get('/api/workgroups').map(res => res.json());
  }

}
