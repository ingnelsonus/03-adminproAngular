import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

   public imgUrl:string ='';
   public nombre:string='';
   public email:string='';


  constructor(private usuarioService:UsuarioService,
              private router:Router
             ) {
                this.imgUrl=this.usuarioService.usuario.imagenUr;
                this.nombre = this.usuarioService.usuario.nombre;
                this.email = this.usuarioService.usuario.email;
             }

  ngOnInit(): void {
  }

  public logout(){
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }


}
