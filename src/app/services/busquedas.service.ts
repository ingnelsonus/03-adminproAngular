import { Usuario } from './../models/usuario.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http:HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }


  public buscar(tipo:'usuarios'|'medicos'|'hospitales',termino:string){

    //http://localhost:3000/api/todo/coleccion/usuarios/faneus
    let url =`${base_url}/todo/coleccion/${tipo}/${termino}`;
    // return this.http.get<{total:number,usuarios:Usuario[]}>(url,this.headers);
    return this.http.get<any[]>(url,this.headers)
                    .pipe(
                      map((resp:any)=>{
                        switch (tipo) {
                          case 'usuarios':
                            return this.transformarUsuarios(resp.resultados);
                          default:
                            return [];
                        }
                      })
                    )
 }

 private transformarUsuarios(resultados:any[]):Usuario[]{

  return resultados.map(
    user => new Usuario(user.nombre,user.email,user.google,'',user.img,user.rol,user.uid)
  );

 }

}
