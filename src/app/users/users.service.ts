import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

export class User {
  constructor(
    public loginId: string,
    public userName: string,
    public description: string,
    public machineCode: string,
    public password: string,
    public loggedin: string,
    public enforcePasswordPolicy: boolean,
    public enforcePasswordExpiration: boolean,
    public userMustChangePassword: boolean,
    public isAccountLocked: boolean,
    public accountLockoutHistory: boolean,
    public lastChanged: Date,
    public userGuid: string,
    public userId: number,
    public isLDAPUser: boolean,
    public domain: string,
    public emailAddress: string,
    public useADEmailAddress: boolean,
    public expirationDate: Date,
    public isDeactivated: boolean
  ) {}
}

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  all() {
    return this.http.get('/api/users').map(res =>{
      var arr = res.json();
      arr.forEach(g=>g.expirationDate ? g.expirationDate = new Date(g.expirationDate) : null);
      return arr;
    });
  }

  get(id) {
    return this.http.get('/api/users/' + id).map(res => res.json());
  }
  
  //@Deprecated (moved to GroupService)
  groups() {
    return this.http.get('/api/workgroups').map(res => res.json());
  }

}
