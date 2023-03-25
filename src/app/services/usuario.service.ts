
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



  constructor(private http:HttpClient) { }

  public validarToken():Observable<boolean>{
    let token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`,{
                          headers:{
                            'x-token':token
                          }
                        })
                        .pipe(
                          tap((resp:any)=>{
                            localStorage.setItem('token',resp.token);
                          }),
                          map((resp)=> true),
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





