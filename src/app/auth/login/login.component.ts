import { UsuarioService } from './../../services/usuario.service';
import { Router, RouterModule } from '@angular/router';
import { Component, OnInit,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

declare const google:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ]
})
export class LoginComponent implements OnInit,AfterViewInit {

  @ViewChild('googleBtn') googleBtn:ElementRef;
  public loginForm:FormGroup;

  constructor(private router:Router,
              private fb:FormBuilder,
              private usuarioService:UsuarioService
             ) {

              this.loginForm = this.fb.group({
                email:[localStorage.getItem('email') || '',[Validators.required,Validators.email]],
                password:['',[Validators.required]],
                remember:[false]
             });

             }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  private googleInit():void{
    google.accounts.id.initialize({
      client_id: "324432252818-600u2afudea2ov2gg6mh77cpfl66i99i.apps.googleusercontent.com",
      callback: response => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  private handleCredentialResponse(response:any){
    // console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
                       .subscribe((resp)=>{
                          //navegar al dashboard
                          this.router.navigateByUrl('/');
                       });
  }

  public login(){

    // console.log(this.loginForm.value);
    this.usuarioService.login(this.loginForm.value)
                       .subscribe(
                       {
                        next:(resp)=>{
                          if(this.loginForm.get('remember')?.value){
                              localStorage.setItem('email',this.loginForm.get('email')?.value);
                          }else{
                              localStorage.removeItem('email');
                          }

                          //navegar al dashboard
                          this.router.navigateByUrl('/');

                        },
                        error:(err)=>{
                          Swal.fire('Error',err.error.msg,'error');
                        }
                       });
  }

}
