import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

//se crear un constructor en el cual vemos si se esta autenticado en firebase,  en el auth,  y el private router es para hacer redirecciones al login
constructor(private auth : AngularFireAuth, private router : Router){

}
  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.auth.authState.pipe(map(status => {

      if(status){
        return true;
      } else{
        this.router.navigate(['login']);
        return false;
      }

    }));
  }
  



}


