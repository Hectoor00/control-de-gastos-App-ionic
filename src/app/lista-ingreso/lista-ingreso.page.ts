import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { IngresosService } from '../service/ingresos.service';
import { Ingreso } from '../model/ingreso.model';
import { ModalPage } from '../modal/modal.page';
import { IngresoModalPage } from '../ingreso-modal/ingreso-modal.page';

@Component({
  selector: 'app-lista-ingreso',
  templateUrl: './lista-ingreso.page.html',
  styleUrls: ['./lista-ingreso.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FormsModule, RouterLink]
})
export class ListaIngresoPage implements OnInit {

  ingresos: any;

  constructor(public ingresosService: IngresosService,
    public modalCtrl: ModalController) {
    this.ingresosService.getIngresos().subscribe(res => {
      console.log(res);

      this.ingresos = res;
    })
  }

  async abrirIngreso(ingreso: any) {
    const modal = await this.modalCtrl.create({
      component: IngresoModalPage,
      componentProps: { id: ingreso.id },
      breakpoints: [1, 0.5, 0.8],
      initialBreakpoint: 0.5
    });

    modal.present();

  }
  ionViewillEnter() {
  }

  ngOnInit(): void {

  }
}

