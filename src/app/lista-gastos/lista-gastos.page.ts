import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { Gasto } from '../model/gasto.model';
import { DataService } from '../service/data.service';
import { ModalPage } from '../modal/modal.page';
@Component({
  selector: 'app-lista-gastos',
  templateUrl: './lista-gastos.page.html',
  styleUrls: ['./lista-gastos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink,]
})
export class ListaGastosPage implements OnInit {
  gastos:any;
  constructor(
    public dataService:DataService,
    public modalCtrl:ModalController
    ) {

      this.dataService.getGastos().subscribe(res=> {
        console.log(res);
        
        this.gastos = res;
      })
    }

    async abrirGasto(gasto:any){
      const modal = await this.modalCtrl.create({
        component: ModalPage, 
        componentProps: {id:gasto.id ,uid: localStorage.getItem('id')},
        breakpoints: [1, 0.5, 0.8],
      initialBreakpoint: 0.5
      });

      modal.present();

    }
    
ionViewillEnter(){
}




ngOnInit(): void {
  
}
}
