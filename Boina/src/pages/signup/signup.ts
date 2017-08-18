import { HomePage } from './../home/home';
import { User } from './../../models/user.model';
import { AuthService } from './../../providers/auth.service';
import { UserService } from './../../providers/user.service';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FirebaseAuthState } from "angularfire2";
import "rxjs/add/operator/first"


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

  signupForm: FormGroup;


  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onSubmit(): void {
    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;
    let username: string = formUser.username;    
    this.userService.userExists(username)
      .first()  //poderia ser take(n) para recuperar n valores
      .subscribe((userExists: boolean) => {

        if (!userExists) {
          this.authService.createAuthUser({
            email: formUser.email,
            password: formUser.password
          }).then((authState: FirebaseAuthState) => {
            delete formUser.password
            formUser.uid = authState.auth.uid;

            this.userService.create(formUser)
              .then(() => {
                console.log("Usuario cadastrado");
                loading.dismiss
                
              }).catch((erro: any) => {
                console.log(erro);
                loading.dismiss();
                this.showAlert(erro);
              });

          }).catch((erro: any) => {
            console.log(erro);
            loading.dismiss();
            this.showAlert(erro);

          });
                    
        } else {
          this.showAlert(`O username ${username} já está sendo usado, escolha outro`);
          loading.dismiss();

        }

      });


  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: "Please wait..."
    });

    loading.present;

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ["Ok"]
    }).present();
  }
}
