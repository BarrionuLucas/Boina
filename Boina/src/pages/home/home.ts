import { UserService } from './../../providers/user.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FirebaseListObservable } from 'angularfire2';

import { Signup } from './../signup/signup';
import { User } from './../../models/user.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: FirebaseListObservable<User[]>;

  constructor(
    public navCtrl: NavController,
    public userService: UserService
  ) {

  }

  ionViewDidLoad(){
    this.users = this.userService.users;
  }

  onChatCreate(user){
    console.log(user.username);
  }

  onSignup(): void{
    this.navCtrl.push(Signup);
  }

}
