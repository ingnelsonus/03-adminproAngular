import { delay } from 'rxjs/operators';

import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { BusquedasService } from './../../../services/busquedas.service';
import { Usuario } from './../../../models/usuario.model';
import { UsuarioService } from './../../../services/usuario.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit,OnDestroy {


  public totalUsuarios:number=0;
  public usuarios:Usuario []=[];
  public usuariosTemp:Usuario []=[];
  public desde:number=0;
  public cargando:boolean=true;
public imgSubs:Subscription;

  constructor(private usuarioService:UsuarioService,
              private busquedaService:BusquedasService,
              private modalImageService:ModalImagenService
             ) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

   this.cargarUsuarios();
   this.imgSubs = this.modalImageService.nuevaImagen
                  .pipe(
                    delay(100)
                  ).subscribe(img=>this.cargarUsuarios());

  }

  public cargarUsuarios(){

    this.cargando=true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe(({total,usuarios})=>{
      this.totalUsuarios = total;
      this.usuarios=usuarios;
      this.usuariosTemp=usuarios;
      this.cargando=false;
    });

  }

  public cambiarPagina(valor:number){
      this.desde +=valor;

      if(this.desde<0){
        this.desde=0;
      }else if(this.desde>=this.totalUsuarios){
        this.desde -=valor;
      }
      this.cargarUsuarios();
  }

  public buscar(termino:string){

    if(termino.length==0){
      this.usuarios=this.usuariosTemp;
      return;
    }

    this.busquedaService.buscar('usuarios',termino)
                        .subscribe(resultados=>{
                          this.usuarios = resultados
                        });
  }


  eliminarUsuario(usuario:Usuario){

    if(usuario.uid===this.usuarioService.uid){
      Swal.fire('Error','No puede borrar este usuario actual','error');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `delete user ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.eliminarUsuario(usuario)
            .subscribe(resp=>{
                this.cargarUsuarios();
                Swal.fire(
                  'Deleted!',
                  `${usuario.nombre}  has been deleted.`,
                  'success'
                )
            });
      }
    })
  }

  public cambiarRol(usuario:Usuario){
    this.usuarioService.actualizarUsuario(usuario)
        .subscribe((resp)=>{
          console.log(resp);
        })
  }

  public abrirModal(usuario:Usuario){
    this.modalImageService.abrirModal('usuarios',usuario.uid,usuario.img);
  }


}
