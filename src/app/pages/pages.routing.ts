
import { RxjsComponent } from './rxjs/rxjs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { Routes,RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';



const routes:Routes=[
  {
    path:'dashboard',
    component:PagesComponent,
    canActivate:[AuthGuard],
    children:[
      //{path:'',redirectTo:'./dashboard',pathMatch:'full'},
      {path:'',component:DashboardComponent,data:{title:'Dashboard',prm:'parametro2'}},
      {path:'progress',component:ProgressComponent,data:{title:'Progress',prm:'parametro2'}},
      {path:'grafica1',component:Grafica1Component,data:{title:'Grafica1',prm:'parametro2'}},
      {path:'account-settings',component:AccountSettingsComponent,data:{title:'Account-Settings',prm:'parametro2'}},
      {path:'promesas',component:PromesasComponent,data:{title:'Promesas',prm:'parametro2'}},
      {path:'perfil',component:PerfilComponent,data:{title:'Perfil'}},
      {path:'rxjs',component:RxjsComponent,data:{title:'rxjs',prm:'parametro2'}},

      //Mantenimientos: usuarios, hospitales, medicos
      {path:'usuarios',component:UsuariosComponent,data:{title:'Usuarios'}}

    ]
  },
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class PagesRoutingModule{}
