import { Injectable } from '@angular/core';
import { Firestore, collectionData, deleteDoc, docData,addDoc } from '@angular/fire/firestore';
import {  collection, doc, updateDoc, where, query } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Ingreso } from '../model/ingreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {

  constructor(public firestore:Firestore) { }
  getIngresos():Observable<Ingreso[]>{
    const ingresosRef = collection(this.firestore, 'ingresos');
    const refq = query(ingresosRef, where('uid','==', localStorage.getItem('id')));
    return  collectionData(refq,{idField:'id'}) as Observable<Ingreso[]>;
  }

  getIngresoById(id: string): Observable<Ingreso>{
    const ingresosDocRef = doc(this.firestore,`ingresos/${id}`);
    return docData(ingresosDocRef,{idField:'id'}) as Observable<Ingreso>
  }

  agregarIngreso(ingreso:Ingreso){
    const ingresosRef = collection(this.firestore, 'ingresos');
    return addDoc(ingresosRef, ingreso);
  }

  eliminarIngreso(ingreso:Ingreso){
    const ingresosDocRef = doc(this.firestore,`ingresos/${ingreso.id}`);
    return deleteDoc(ingresosDocRef);
  }

  actualizarIngreso(ingreso:Ingreso){
    const ingresoDocRef = doc(this.firestore,`ingresos/${ingreso.id}`);
    return updateDoc(ingresoDocRef,{cantidad:ingreso.cantidad,descripcion:ingreso.descripcion,fecha:ingreso.fecha})
  }
}
