import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { SodebarService } from 'src/app/services/sodebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems:any[] ;
  public imgUrl:string='';
  public nombre:string='';

  constructor(private sodebarservice:SodebarService,
              private usuarioService:UsuarioService) {

                this.menuItems=sodebarservice.menu;
                this.imgUrl = this.usuarioService.usuario.imagenUr;
                this.nombre = this.usuarioService.usuario.nombre;
              }

  ngOnInit(): void {
  }

}
