import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../service/data.service';
import { Gasto } from '../model/gasto.model';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ModalPage implements OnInit {

  @Input() id: string = ''
  gasto: Gasto = {
      id: '',
      cantidad: '',
      descripcion:'',
      fecha:'',
      uid:''
  }

  constructor(public dataService:DataService, public modalCtrl: ModalController, public toastCtrl: ToastController, public AlertCtrl:AlertController, public router:Router)
   {}

  ngOnInit() {
    console.log(this.id);
    this.dataService.getGastoById(this.id).subscribe(res => {
      this.gasto = res;
      
    });
  }

  async actualizarGasto(){
     this.dataService.actualizarGasto(this.gasto);
    const toast = await this.toastCtrl.create({
      message: "Se actualizo corectamente el gasto...",
      duration: 1000
    });

    toast.present();
  }

  async eliminarGasto(){
    const alertElement = await this.AlertCtrl.create({
      header: 'Estas seguro de querer eliminar el gasto',
      message: 'Se cuidadoso al eliminar',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.dataService.eliminarGasto(this.gasto);
            this.router.navigate(['/lista-gastos'])
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
