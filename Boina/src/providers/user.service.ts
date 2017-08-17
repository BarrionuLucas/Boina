import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { User } from "../models/user.model";

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserService {

  users:FirebaseListObservable<User[]>

  constructor(
    public af: AngularFire,
    public http: Http) {
    this.users = this.af.database.list('/users');
  }

  create(user: User): firebase.Promise<void>{
    return this.users.push(user);
  }

}
