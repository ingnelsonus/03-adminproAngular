import { UsuarioService } from './../services/usuario.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor (private usuarioService:UsuarioService,
               private router:Router
              ){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      // this.usuarioService.validarToken()
      //                    .subscribe((resp)=>{
      //                       console.log(resp);
      //                    })
      // console.log('Paso por en canActivate del garud auth...');

      // return true;

      return this.usuarioService.validarToken()
             .pipe(
                tap((isAuth)=>{
                  if(!isAuth){
                      this.router.navigateByUrl('/login');
                  }
                })
             )
  }

}
