import { PagesRoutingModule } from './pages/pages.routing';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';

const routes:Routes =[
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},
  {path:'**',component:NotpagefoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
