import { Usuario } from './../models/usuario.model';

import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from './../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';

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

  constructor(private http:HttpClient) { }

  public validarToken():Observable<boolean>{


    return this.http.get(`${base_url}/login/renew`,{
                          headers:{
                            'x-token':this.token
                          }
                        })
                        .pipe(
                          map((resp:any)=>{
                            console.log(resp);
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

    return  this.http.put(`${base_url}/usuarios/${this.uid}`,formData,{
                          headers:{
                            'x-token':this.token
                          }
                        })
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




}





