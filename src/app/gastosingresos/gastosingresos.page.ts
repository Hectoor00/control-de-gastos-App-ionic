import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gastosingresos',
  templateUrl: './gastosingresos.page.html',
  styleUrls: ['./gastosingresos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class GastosingresosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
