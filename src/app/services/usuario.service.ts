import { Usuario } from './../models/usuario.model';

import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from './../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

declare const google:any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario:Usuario;

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get uid():string{
    return this.usuario.uid || '';
  }

  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  constructor(private http:HttpClient) { }

  public validarToken():Observable<boolean>{


    return this.http.get(`${base_url}/login/renew`,{
                          headers:{
                            'x-token':this.token
                          }
                        })
                        .pipe(
                          map((resp:any)=>{
                            this.usuario=new Usuario(
                              resp.usuario.nombre,
                              resp.usuario.email,
                              resp.usuario.google,
                              '',
                              resp.usuario.img||'',
                              resp.usuario.rol,
                              resp.usuario.uid
                            );
                            localStorage.setItem('token',resp.token);
                            return true;
                          }),
                          catchError((error)=> of(false))
                        );
  }

  public crearUsuario(formData:RegisterForm){

     return this.http.post(`${base_url}/usuarios`,formData)
                    .pipe(
                      tap((resp:any)=>{
                        //console.log(resp);
                        localStorage.setItem('token',resp.token);
                      })
                    );
  }

  public actualizarPerfil(formData:{nombre:string,email:string,rol:string}){

    formData={...formData,rol:this.usuario.rol}

    return  this.http.put(`${base_url}/usuarios/${this.uid}`,formData,this.headers)
                     .pipe(
                      tap((resp)=>{
                        return resp;
                      }),
                      catchError((error)=> of(false))
                     )

  }

  public login(formData:LoginForm){

    return this.http.post(`${base_url}/login`,formData)
                    .pipe(
                      tap((resp:any)=>{
                        localStorage.setItem('token',resp.token);
                      })
                    );
 }

 public loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`,{token})
                    .pipe(
                      tap((resp:any)=>{
                        // console.log(resp);
                        localStorage.setItem('token',resp.token);
                      })
                    );
 }

 public logout(){
  localStorage.removeItem('token');

  google.accounts.id.revoke('fabiousuga@gmail.com',()=>{

  });

 }

 public cargarUsuarios(desde:number=0){

    //http://localhost:3000/api/usuarios?desde=0
    let url =`${base_url}/usuarios?desde=${desde}`;
    // return this.http.get<{total:number,usuarios:Usuario[]}>(url,this.headers);
    return this.http.get<CargarUsuario>(url,this.headers)
                    .pipe(
                      //solo para fines demostrativos.
                      delay(1000),
                      map(resp=>{
                        let usuarioslist =resp.usuarios.map(
                          user => new Usuario(user.nombre,user.email,user.google,'',user.img,user.rol,user.uid)
                        );

                        return {
                          total:resp.total,
                          usuarios:usuarioslist
                        };
                      })
                    )
 }

 public eliminarUsuario(usuario:Usuario){

  //http://localhost:3000/api/usuarios/6414c32a1553fc750b76b3f2
  let url =`${base_url}/usuarios/${usuario.uid}`;
  return this.http.delete(url,this.headers);

 }

 public actualizarUsuario(usuario:Usuario){

  return  this.http.put(`${base_url}/usuarios/${usuario.uid}`,usuario,this.headers)
                   .pipe(
                    tap((resp)=>{
                      return resp;
                    }),
                    catchError((error)=> of(false))
                   )

}


}





