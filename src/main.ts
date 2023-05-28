import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore'
import { FormControl } from '@angular/forms';
import { provideFirebaseApp,initializeApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { NgChartsModule } from 'ng2-charts';



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy },
      NgChartsModule,
    importProvidersFrom(
      IonicModule.forRoot({}),
      AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
      AngularFireAuthModule, 
      AngularFirestoreModule,
      FormsModule,FormControl,
      BrowserModule,
      provideFirebaseApp(()=> initializeApp(environment.FIREBASE_CONFIG)),
      provideFirestore(()=>{
        return getFirestore()})
      ),
    provideRouter(routes),
  ],
});
