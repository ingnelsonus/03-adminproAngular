import { delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { Medico } from 'src/app/models/medicos.model';
import { MedicoService } from 'src/app/services/medico.service';
import { Hospital } from './../../../models/hospitales.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HositalService } from 'src/app/services/hosital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm:FormGroup;
  public hospitales:Hospital[]=[];

  public medicoSeleccionado:Medico;
  public hospitalSeleccionado:Hospital;

  constructor(private fb:FormBuilder,
              private hospitalService:HositalService,
              private medicService:MedicoService,
              private router:Router,
              private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {

     this.activateRoute.params.subscribe(({id})=>{
      this.cargarMedicoById(id);
      //console.log('tick');
     });

    this.medicoForm=this.fb.group({
      nombre:['',Validators.required],
      hospital:['',Validators.required]
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges
        .subscribe((hospitalId)=>{
            this.hospitalSeleccionado =this.hospitales.find(h=>h._id===hospitalId);
            //console.log('tick');
        });
  }


  private cargarMedicoById(id:string){

     if(id==='nuevo'){
      return;
     }

      this.medicService.cargarMedicoById(id)
          .pipe(
            delay(100)
          )
          .subscribe((medico)=>{

            if(!medico){
               this.router.navigateByUrl(`/dashboard/medicos`);
            }

            const {nombre,hospital:{_id}}=medico;
            this.medicoSeleccionado = medico;
            this.medicoForm.setValue({nombre,hospital:_id});
            this.hospitalSeleccionado =this.hospitales.find(h=>h._id===_id);
          });
  }

  public guardarMedico(){

   if(this.medicoSeleccionado){
    //actualizar.
    let data = {...this.medicoForm.value,
                _id:this.medicoSeleccionado._id
               };
    this.medicService.actualizarMedico(data)
        .subscribe((resp)=>{
          Swal.fire('Actualizado','Medico actualizado','success');
        });
   }else{
    //crear.
    this.medicService.crearMedicos(this.medicoForm.value)
    .subscribe((resp:any)=>{
      Swal.fire('Creado','Medico registrado','success');
      this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
    });
   }


  }

  public cargarHospitales(){
    this.hospitalService.cargarHospitales()
        .subscribe((hospitales)=>{
          this.hospitales = hospitales;
        })
  }

}
