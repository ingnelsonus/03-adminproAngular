import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medicos.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit,OnDestroy {

  public medicos:Medico[]=[];
  public medicosTemp:Medico[]=[];
  public cargando:boolean=false;
  public imgSubs:Subscription;

  constructor(private medicoService:MedicoService,
              private modalImageService:ModalImagenService,
              private busquedaService:BusquedasService) { }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImageService.nuevaImagen
                  .pipe(
                    delay(100)
                  ).subscribe(img=>this.cargarMedicos());

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  public cargarMedicos(){
      this.cargando=true;
      this.medicoService.cargarMedicos()
          .subscribe((medicos)=>{
            this.medicos = medicos;
            this.medicosTemp=medicos;
            this.cargando=false;
          })
  }

  public buscar(termino:string){

    if(termino.length==0){
      this.medicos=this.medicosTemp;
      return;
    }

    this.busquedaService.buscar('medicos',termino)
                        .subscribe((resultados:Medico[])=>{
                          this.medicos = resultados
                        });
  }

  public actualizarMedico(medico:Medico){
      this.medicoService.actualizarMedico(medico)
          .subscribe((resp)=>{
            Swal.fire('actualizado',medico.nombre,'success');
          });
  }

  public eliminarMedico(medico:Medico){
        Swal.fire({
          title: 'Are you sure?',
          text: `delete medic ${medico.nombre}`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
              this.medicoService.eliminarMedico(medico._id)
              .subscribe((resp)=>{
                this.cargarMedicos();
                Swal.fire('Eliminado',`Medico ${medico.nombre} eliminado.`,'success');
              });
          }
        })
  }

  public abrirModal(medico:Medico){
    this.modalImageService.abrirModal('medicos',medico._id,medico.img);
  }

}
