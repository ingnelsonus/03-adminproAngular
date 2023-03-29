import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir:File;
  public imgTemp:any='';


  constructor(public modalImagenService:ModalImagenService,
              private fileUploadService:FileUploadService
             ) { }

  ngOnInit(): void {
  }

  public cerrarModal(){
    this.imgTemp=null;
    this.modalImagenService.cerrarModal();
  }

  public cambiarImagen(file:File){
    this.imagenSubir= file;

    if(!file){
      return this.imgTemp=null;
    }

    let reader = new FileReader();
    let url64 =reader.readAsDataURL(file);

    reader.onload=()=>{
      this.imgTemp =reader.result;

    }
}

public updateImagenPerfil(){

  let id = this.modalImagenService.id;
  let tipo =this.modalImagenService.tipo;

  this.fileUploadService.actualizarFoto(this.imagenSubir,tipo,id)
                        .then(img =>{
                          Swal.fire('Guardado','Los cambios fueron aplicados','success');
                          this.modalImagenService.nuevaImagen.emit(img);
                          this.cerrarModal();
                        }).catch(err=>{
                          Swal.fire('Error','No se pudo subir la imagen','error');
                        })
}

}
