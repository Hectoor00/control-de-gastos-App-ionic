import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



import { Gasto } from '../model/gasto.model';
import { DataService } from '../service/data.service';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { IngresosService } from '../service/ingresos.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { log } from 'console';
import { ModalPage } from '../modal/modal.page';


import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ignoreElements } from 'rxjs';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import * as moment from 'moment';
import { Chart } from 'chart.js';

import * as htmlToImage from 'html-to-image';









@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, FormsModule, ReactiveFormsModule],
})


export class HomePage implements OnInit {
  gastos: any;
  ingresos:any;
  usuario:any;

  gastosm:any;
  ingresosm:any;

  numeroDeGastos:any;

  
  total:number=0;
  totalGasto:any;
  totalIngreso:any;
  cantidades:any;
  cantidadesIngreso:any;
  pdf:any;

  fechaActual:string;
  data:any[]


  
  
  
  constructor(
    public dataService: DataService,
    public alertCtrl: AlertController,
    public ingresosService:IngresosService,
    private auth: AngularFireAuth,
    private router: Router,
    public modalCtrl:ModalController,
    private renderer2:Renderer2
  ) {



    // datos del usuario autenticado    
    this.usuario={};
    this.auth.currentUser.then(user => this.usuario = user);

    


    //Mostart la cantidad de gastos que hay en la base de datos

    // this.dataService.getGastos().subscribe(res => {
  

     
    //   this.numeroDeGastos = res.length;

    //   this.total = this.totalIngreso - this.totalGasto;


    //   if (this.total>=1 && this.total <= 399) {
    //     const totalGastos = document.querySelector('#TotalGastos');
    //     const bgContenido = document.querySelector('#contenido');
    //     totalGastos.className=''; 
    //     totalGastos.classList.add('summary1'); //colorr amarillo

    //     bgContenido.className='ion-padding ';
    //     bgContenido.classList.add('bgContenido1');
    //   }

    //   if (this.total<=0) {
    //     const totalGastos = document.querySelector('#TotalGastos');
    //     const bgContenido = document.querySelector('#contenido');

    //     totalGastos.className=''; 
    //     totalGastos.classList.add('summary2'); //color rojo

    //     bgContenido.className='ion-padding ';

    //     bgContenido.classList.add('bgContenido2');
    //   }

    //   if (this.total>=400) {
    //     const totalGastos = document.querySelector('#TotalGastos');
    //     const bgContenido = document.querySelector('#contenido');

    //     totalGastos.className=''; 
        
    //     totalGastos.classList.add('summary'); //color verde

    //     bgContenido.className='ion-padding ';

    //     bgContenido.classList.add('bgContenido');
    //   }
    // });

    //  Total de todos los gastos del usuario

    this.dataService.getGastos().subscribe(res => {

      this.totalGasto = res.map(cantidadRef=> parseFloat(cantidadRef.cantidad));

      let suma = this.totalGasto.reduce((acumulador, valorActual) => acumulador + valorActual);

      this.totalGasto= suma as number;
      // console.log(this.totalGasto);
      

  
      this.cantidades =  res.map(cantidadRef=> parseFloat(cantidadRef.cantidad));

      // console.log(this.cantidades);

      this.calcularTotal();
      this.createpdf();
      this.generarGrafico();
      
    });











    //mostrar los 3 gastos mayores
  this.dataService.getGastos().subscribe(res=> {
      
      
      this.gastosm = res.sort((a, b) => parseFloat(b.cantidad) - parseFloat(a.cantidad));
      this.gastosm = this.gastosm.slice(0, 3);

    console.log(this.gastosm);

    });


     //mostrar los 3 Ingresos mayores
  this.ingresosService.getIngresos().subscribe(res=> {
      
      
      this.ingresosm = res.sort((a, b) => parseFloat(b.cantidad) - parseFloat(a.cantidad));
      this.ingresosm = this.ingresosm.slice(0, 3);

      console.log(this.ingresosm);

    });


    











  //  mostral el total de los Ingresos del Usuario

  
      this.ingresosService.getIngresos().subscribe(res => {

        this.totalIngreso = res.map(cantidadRef=> parseFloat(cantidadRef.cantidad));
        this.cantidadesIngreso =  res.map(cantidadRef=> parseFloat(cantidadRef.cantidad));
  
        let sumaIngreso = this.totalIngreso.reduce((acumulador, valorActual) => acumulador + valorActual);

        this.totalIngreso= sumaIngreso;

        this.calcularTotal();
        this.createpdf();
        this.generarGrafico();

  });



    //Mostrar todos los gastos de la base de datos

    this.dataService.getGastos().subscribe(res => {
      console.log(res);
  
      this.gastos = res;
      this.createpdf();

    });

    //Mostrar todos los ingresos de la base de datos
    this.ingresosService.getIngresos().subscribe(res => {
      // console.log(res);

      this.ingresos = res;
      this.createpdf();

    })

  }
  ngOnInit() {
    this.generarGrafico();
  }
  
  ionViewWillEnter(){
    this.generarGrafico();
  }

  async agregarGasto(gasto: string) {
    const alert = await this.alertCtrl.create({
      header: 'Agregar gasto',
      inputs: [
        {
          name: 'cantidad',
          placeholder: '$0.00',
          type: 'number',
        },
        {
          name: 'descripcion',
          placeholder: 'Detalle su gasto',
          type: 'text',
        },
        {
          name: 'fecha',
          type: 'date',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Agregar',
          handler: (res) => {
            console.log(res);

            if (res.cantidad && res.descripcion && res.fecha) {
              this.dataService.agregarGasto({
                cantidad: res.cantidad  ,
                descripcion: res.descripcion ,
                fecha: res.fecha,
                uid: localStorage.getItem('id')
              });
            } else {
              // Mostrar mensaje de error o realizar otra acción
              this.mostrarAlerta('Debe completar todos los campos requeridos');
        
            }

            
          
          }
        }
      ]
    });
    await alert.present();
  }

  async agregarIngreso(ingreso: string) {
    const alert = await this.alertCtrl.create({
      header: 'Agregar ingreso',
      inputs: [
        {
          name: 'cantidad',
          placeholder: '$0.00',
          type: 'number',
          
        },
        {
          name: 'descripcion',
          placeholder: 'Detalle su Ingreso',
          type: 'text',
          
        },
        {
          name: 'fecha',
          type: 'date',
          
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Agregar',
          handler: (res) => {
            // console.log(res);

            if (res.cantidad && res.descripcion && res.fecha) {
              this.ingresosService.agregarIngreso({
                cantidad: res.cantidad  ,
                descripcion: res.descripcion ,
                fecha: res.fecha,
                uid: localStorage.getItem('id')
              });
            }
            else {
              // Mostrar mensaje de error o realizar otra acción
              this.mostrarAlerta('Debe completar todos los campos requeridos');
        
            }
            
           
          }
        }
      ]
    });
    await alert.present();
  }

  // funcion para cerrar sesion 

  cerrarSesion(){

    this.auth.signOut().then(() => this.router.navigate(['login']));
  }


  //funcion para generar el pdf

  createpdf():void{

     
      const gastos = [];
      const ingresos = [];
      const total = [];
    
    
      // Agregar el encabezado
      const headerGastos = ['Descripcion del Gasto', 'Cantidad a Pagar', 'Fecha'];
      gastos.push(headerGastos);

      // Agregar el encabezado
      const headerIngresos = ['Descripcion del Ingreso', 'Cantidad a Recibir', 'Fecha'];
      ingresos.push(headerIngresos);

      const headertotalFinal = ['Descripcion', 'Cantidad Sobrante', 'Fecha'];
      total.push(headertotalFinal);
    
      // Agregar los datos
      this.gastos.forEach(dato => {
        const fila = [dato.descripcion, dato.cantidad, dato.fecha];
        gastos.push(fila);
      });

      const totalGastos = ['TOTAL', this.totalGasto, this.fechaActual = moment().format('YYYY-MM-DD')];
      gastos.push(totalGastos);

      this.ingresos.forEach(dato => {
        const fila = [dato.descripcion, dato.cantidad, dato.fecha];
        ingresos.push(fila);
      });

      const totalIngreso = ['TOTAL', this.totalIngreso, this.fechaActual = moment().format('YYYY-MM-DD')];
      ingresos.push(totalIngreso);

      const totalFinal = ['Sobrante', this.total, this.fechaActual = moment().format('YYYY-MM-DD')];
      total.push(totalFinal);

   
    const pdfDefinition = {
      content:[
        {
          text:'usuario: ' + this.usuario.email
          
        },
        {
          text:' ' 
          
        },
        {
          text:'Gastos:' 
          
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*'], // Aquí defines los anchos de las columnas, '*' significa que todas las columnas tendrán el mismo ancho
            body:gastos
          }
        },
        {
          text:' ' 
          
        },
        {
          text:'Ingresos:' 
          
        },
        
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*'], // Aquí defines los anchos de las columnas, '*' significa que todas las columnas tendrán el mismo ancho
            body:ingresos
          }
        },
        {
          text:' ' 
          
        },
        {
          text:'Sobrante:' 
          
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*'], // Aquí defines los anchos de las columnas, '*' significa que todas las columnas tendrán el mismo ancho
            body:total
          }
        },
      ]
    };

    this.pdf= pdfDefinition;

}


generarPdf(){
  pdfMake.createPdf(this.pdf).download('Control de Gastos.pdf');
}



// se calcula el total que queda al restar los ingresos con los gastos
calcularTotal(){
  this.total = this.totalIngreso - this.totalGasto;
  this.generarGrafico();  
};

//generar grafico con chart.js parte typeScript
generarGrafico(){

  if (this.totalIngreso === undefined || this.totalGasto === undefined) {
    return;
  }

  //renderizamos el grafico en html
  const canvas = document.querySelector('#myChart');
  const ctx = (canvas as HTMLCanvasElement).getContext('2d');
  const myChart =new Chart(ctx, {
    

    //estructura del grafico
    type: 'pie',
    data: {
      labels: [
        'gastos',
        'ingresos',
        
      ],
      datasets: [{
        label: 'cantidad',
        data: [this.totalGasto,this.totalIngreso],
        backgroundColor: [
          'rgb(194, 10, 10)',
          'rgb(88,187,25)',
        ],
        borderColor:['rgb(0,0,0)'],
        hoverOffset: 4
      }]
    }
  });

  

  setInterval(() => {
    // Actualizar los valores del gráfico
    myChart.data.datasets[0].data = [this.totalGasto, this.totalIngreso];
    myChart.update(); // Actualizar el gráfico
  }, 5000); 
}




//alerta para cuando no se envian los datos
async mostrarAlerta(mensaje: string) {
  const alert = await this.alertCtrl.create({
    header: 'Error',
    message: mensaje,
    buttons: ['Aceptar']
  });

  await alert.present();
}


 
}



