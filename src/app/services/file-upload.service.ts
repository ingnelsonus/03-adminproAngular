import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

const base_url =environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  constructor() { }

  async actualizarFoto(
        archivo:File,
        tipo:'usuarios'|'medicos'|'hospitales',
        id:string
  ){
    try {

        let url = `${base_url}/upload/${tipo}/${id}`;
        let formData =new FormData();
        formData.append('imagen',archivo);

        let resp = await fetch(url,{
          method:'PUT',
          headers:{
            'x-token':localStorage.getItem('token') ||''
          },
          body:formData
        });

        const data = await resp.json();

        if(data.ok){
          return data.nombreArchivo;
        }else{
          console.log(data.msg);
          return false;
        }

        return 'Nombre de la imagen';

    } catch (error) {
      console.log(error);
      return false;
    }

  }

}
