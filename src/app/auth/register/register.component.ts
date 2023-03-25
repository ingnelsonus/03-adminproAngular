import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  public formSubmitted=false;

  public registerForm = this.fb.group({
     nombre:['testuser16',[Validators.required,Validators.minLength(3)]],
     email:['testuser16faneus@gmail.com',[Validators.required,Validators.email]],
     password:['123456',[Validators.required]],
     password2:['123456',[Validators.required]],
     terminos:[true,[Validators.required,Validators.requiredTrue]],
  },{
    Validators:this.passwordsIguales('password','password2')
  });

  constructor(private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private router:Router
             ) { }

  ngOnInit(): void {
  }

  public crearUsuario(){
    this.formSubmitted=true;
    console.log(this.registerForm.value);

    if(this.registerForm.invalid || this.passwordsNoValidos()){
      return;
    }

    //Realizar la creacion del usuario.
    this.usuarioService.crearUsuario(this.registerForm.value)
                       .subscribe(
                        {
                          next:(resp) => {
                            // console.log('Usuario creado');
                            // console.log(resp);
                            //navegar al dashboard
                            this.router.navigateByUrl('/');
                          },
                          error:(e) =>{
                            Swal.fire('Error',e.error.msg,'error');
                          }
                       });
  }

  public campoNoValido(campo:string):boolean{

    if(this.formSubmitted && this.registerForm.get(campo)?.invalid){
      return true;
    }else{
      return false;
    }

  }

  public passwordsNoValidos():boolean{
     const pass1= this.registerForm.get("password") ?.value;
     const pass2= this.registerForm.get("password2") ?.value;


     if((pass1!==pass2) && this.formSubmitted){
        return true;
     }else{
        return false;
     }
  }

  public aceptaTerminos():boolean{
      return (!this.registerForm.get('terminos')?.value && this.formSubmitted);
  }

  passwordsIguales(pass1Name:string,pass2Name:string){
    return (formGroup:FormGroup) =>{
        let pass1Control = formGroup.get(pass1Name);
        let pass2Control = formGroup.get(pass2Name);

        if(pass1Control?.value === pass2Control?.value){
           pass2Control?.setErrors(null);
        }else{
           pass2Control?.setErrors({noEsIgual:true});
        }
    }

  }

}
