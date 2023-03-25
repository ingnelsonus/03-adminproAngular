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

  constructor(private usuarioService:UsuarioService,
              private router:Router
             ) { }

  ngOnInit(): void {
  }

  public logout(){
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }


}
