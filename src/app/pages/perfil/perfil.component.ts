import { FileUploadService } from './../../services/file-upload.service';
import { Usuario } from './../../models/usuario.model';
import { Subscription } from 'rxjs';
import { UsuarioService } from './../../services/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm:FormGroup
  public usuario: Usuario;
  public imagenSubir:File;
  public imgTemp:any='';

  constructor(private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private fileUploadService:FileUploadService
             ) {

              this.usuario =usuarioService.usuario;

             }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre:[this.usuario.nombre,Validators.required],
      email:[this.usuario.email,[Validators.required,Validators.email]]
    });
  }

  public actualizarPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
                      .subscribe(
                        {
                          next:(resp) => {
                             console.log(resp);
                             this.usuario.nombre= this.perfilForm.get("nombre").value;
                             this.usuario.email = this.perfilForm.get('email').value;
                             Swal.fire('guardado','Los cambios fueron guardados.','success');
                          },
                          error:(e) =>{
                            Swal.fire('Error',e.error.msg,'error');
                          }
                      });
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
    this.fileUploadService.actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid)
                          .then(img =>{
                            this.usuario.img=img;
                            Swal.fire('Guardado','Los cambios fueron aplicados','success');
                          });
  }

}
