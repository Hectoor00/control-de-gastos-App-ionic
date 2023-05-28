import { Injectable } from '@angular/core';
import { Firestore, collectionData, deleteDoc, docData,addDoc } from '@angular/fire/firestore';
import {  collection, doc, updateDoc, where, query } from 'firebase/firestore';
import { Gasto } from '../model/gasto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor( public firestore:Firestore) { }

  getGastos():Observable<Gasto[]>{
    const gastosRef = collection(this.firestore, 'gastos');
    const refq = query(gastosRef, where('uid','==', localStorage.getItem('id')));
    return  collectionData( refq,{idField:'id'}) as Observable<Gasto[]>;
  }
  

  getGastoById(id: string): Observable<Gasto>{
    const gastoDocRef = doc(this.firestore,`gastos/${id}`);
    return docData(gastoDocRef,{idField:'id'}) as Observable<Gasto>
  }



  agregarGasto(gasto:Gasto){
    const gastosRef = collection(this.firestore, 'gastos');
    return addDoc(gastosRef, gasto);
  }

  eliminarGasto(gasto:Gasto){
    const gastoDocRef = doc(this.firestore,`gastos/${gasto.id}`);
    return deleteDoc(gastoDocRef);
  }

  actualizarGasto(gasto:Gasto){
    const gastoDocRef = doc(this.firestore,`gastos/${gasto.id}`);
    return updateDoc(gastoDocRef,{cantidad:gasto.cantidad,descripcion:gasto.descripcion,fecha:gasto.fecha})
  }

  
}
