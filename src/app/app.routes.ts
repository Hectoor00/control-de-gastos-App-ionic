import { Routes } from '@angular/router';
import { ArgumentOutOfRangeError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage)
  },
  {
    path: '',
    
    redirectTo: 'login',
    pathMatch: 'full',

  },
  {
    path: 'registro', 
    loadComponent: () => import('./registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'lista-ingreso',
    canActivate: [AuthGuard],
    loadComponent: () => import('./lista-ingreso/lista-ingreso.page').then( m => m.ListaIngresoPage)
  },
  {
    path: 'lista-gastos',
    canActivate: [AuthGuard],
    loadComponent: () => import('./lista-gastos/lista-gastos.page').then( m => m.ListaGastosPage)
  },
  {
    path: 'gastosingresos',
    canActivate: [AuthGuard],
    loadComponent: () => import('./gastosingresos/gastosingresos.page').then( m => m.GastosingresosPage)
  },
  {
    path: 'modal',
    canActivate: [AuthGuard],
    loadComponent: () => import('./modal/modal.page').then( m => m.ModalPage)
  },
  {
    path: 'ingreso-modal',
    canActivate: [AuthGuard],
    loadComponent: () => import('./ingreso-modal/ingreso-modal.page').then( m => m.IngresoModalPage)
  },
];
