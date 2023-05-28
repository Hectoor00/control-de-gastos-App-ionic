import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { IonicModule, LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from '../model/usuario.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicSlides } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class RegistroPage implements OnInit {
  swiperModules = [IonicSlides];

  user = {} as User;
  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth,
    public navCtrl: NavController,
  ) { }

  ngOnInit() { }

  async registro(user: User) {
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: "Espere por favor..."
      })
      await loader.present();

      try {

        await this.afAuth.createUserWithEmailAndPassword(user.correo, user.password).then(data => {
          console.log(data);

          this.navCtrl.navigateRoot("/login")

        })

      } catch (error: any) {

        error.message = "Usuario no registrado";
        let errormessage = error.message || error.getLocalizeMessage();

        this.showToast(errormessage)

      }

      await loader.dismiss();

    }
  }

  formValidation() {
    if (!this.user.correo) {
      this.showToast("Ingrese un correo");

      return false;
    }
    if (!this.user.password) {
      this.showToast("Ingrese una contraseña");

      return false;
    }

    return true;
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 4000
    }).then(toastData => toastData.present());
  }
}
