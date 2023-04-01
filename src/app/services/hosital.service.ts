import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospitales.model';

const base_url =environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HositalService {

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

  public cargarHospitales(){
    let url =`${base_url}/hospitales`;
    return this.http.get(url,this.headers)
                    .pipe(
                      map((resp:{ok:boolean,hositales:Hospital[]}) =>resp.hositales)
                    );
 }

 public crearHospitale(nombre:string){
  let url =`${base_url}/hospitales`;
  // return this.http.get<{total:number,usuarios:Usuario[]}>(url,this.headers);
  return this.http.post(url,{nombre},this.headers);

}

public actualizarHospitale(_id:string,nombre:string){
  let url =`${base_url}/hospitales/${_id}`;
  // return this.http.get<{total:number,usuarios:Usuario[]}>(url,this.headers);
  return this.http.put(url,{nombre},this.headers);

}

public eliminarHospitale(_id:string){
  let url =`${base_url}/hospitales/${_id}`;
  // return this.http.get<{total:number,usuarios:Usuario[]}>(url,this.headers);
  return this.http.delete(url,this.headers);

}


}
