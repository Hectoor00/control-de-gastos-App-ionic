import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { IngresosService } from '../service/ingresos.service';
import { Ingreso } from '../model/ingreso.model';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ingreso-modal',
  templateUrl: './ingreso-modal.page.html',
  styleUrls: ['./ingreso-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IngresoModalPage implements OnInit {
  @Input() id: string = ''
  ingreso: Ingreso = {
      id: '',
      cantidad: '',
      descripcion:'',
      fecha:'',
      uid:''
  }


  constructor( public ingresosService:IngresosService, public modalCtrl: ModalController, public toastCtrl: ToastController, public AlertCtrl:AlertController, public router:Router) { }

  ngOnInit() {
    console.log(this.id);
    this.ingresosService.getIngresoById(this.id).subscribe(res => {
      this.ingreso = res;
      
    });
  }
  async actualizarIngreso(){
    this.ingresosService.actualizarIngreso(this.ingreso);
   const toast = await this.toastCtrl.create({
     message: "Se actualizo corectamente el ingreso...",
     duration: 1000
   });

   toast.present();
 }

 async eliminarIngreso(){
  const alertElement = await this.AlertCtrl.create({
    header: 'Estas seguro de querer eliminar el ingreso',
    message: 'Se cuidadoso al eliminar',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Eliminar',
        handler: () => {
          this.ingresosService.eliminarIngreso(this.ingreso);
          this.router.navigate(['/lista-ingreso'])
          toast.present()
        }
      }
    ]
  });
  const toast = await this.toastCtrl.create({
    message: "Se elimino el gasto...",
    duration: 1000
  });
    this.modalCtrl.dismiss();
    await alertElement.present()
   
}


}
