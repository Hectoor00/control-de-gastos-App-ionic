import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { IonicModule, LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from '../model/usuario.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { uid } from 'chart.js/dist/helpers/helpers.core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, FormsModule,RouterModule,ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  user = {} as User;

  constructor( 
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth,
    public navCtrl: NavController,) { }

  ngOnInit() {}

  async login (user: User){
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message:"Espere por favor..."
      })
      await loader.present();

      try {

        await this.afAuth.signInWithEmailAndPassword(user.correo, user.password).then(data=>{
          console.log(data.user.uid);

         let id = data.user.uid

        localStorage.setItem('id', JSON.stringify(id))

          this.navCtrl.navigateRoot("/home")
          
        })
        
      } catch (error:any) {

        error.message = "Usuario no registrado";
        let errormessage = error.message || error.getLocalizeMessage();

        this.showToast(errormessage)
        
      }

      await loader.dismiss();
      
    }
  }

  formValidation(){
    if (!this.user.correo) {
      this.showToast("Ingrese un correo registrado");

      return false;
    }
    if (!this.user.password) {
      this.showToast("Contraseña invalida");

      return false;
    }

    return true;
  }

  showToast(message:string){
    this.toastCtrl.create({
      message:message,
      duration: 5000
    }).then(toastData => toastData.present());
  }

}
