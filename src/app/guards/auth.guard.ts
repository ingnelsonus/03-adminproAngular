import { Injectable } from '@angular/core';
import { UsuarioService } from './../services/usuario.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class AuthGuard implements CanActivate,CanLoad {

  constructor (private usuarioService:UsuarioService,
               private router:Router
              ){}


  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
    return this.usuarioService.validarToken()
    .pipe(
       tap((isAuth)=>{
         if(!isAuth){
             this.router.navigateByUrl('/login');
         }
       })
    )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

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
