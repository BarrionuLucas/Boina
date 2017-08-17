import { Signup } from './../pages/signup/signup';
import { BrowserModule } from '@angular/platform-browser';

import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule , FirebaseAppConfig } from 'angularfire2';
import { UserService } from "../providers/user.service";



const firebaseAppConfig: FirebaseAppConfig = {
  
    apiKey: "AIzaSyAyM5pKzZGqIZOT2FZJKmxLCib3_MH61VQ",
    authDomain: "boina-66b75.firebaseapp.com",
    databaseURL: "https://boina-66b75.firebaseio.com",
    storageBucket: "boina-66b75.appspot.com",
    messagingSenderId: "435548578835"

};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Signup
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Signup
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    AuthService
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
