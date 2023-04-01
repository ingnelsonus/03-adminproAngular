
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Hospital } from './../../../models/hospitales.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HositalService } from 'src/app/services/hosital.service';
import { BusquedasService } from './../../../services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit,OnDestroy {

  public hospitales:Hospital[]=[];
  public hospitalesTemp:Hospital []=[];

  public cargando:boolean=true;
  public imgSubs:Subscription;

  constructor(private hospiltaService:HositalService,
              private modalImageService:ModalImagenService,
              private busquedaService:BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImageService.nuevaImagen
                  .pipe(
                    delay(100)
                  ).subscribe(img=>this.cargarHospitales());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  public cargarHospitales(){
    this.cargando=true;
    this.hospiltaService.cargarHospitales()
    .subscribe((hospitales)=>{
      this.hospitales = hospitales;
      this.hospitalesTemp=hospitales;
      this.cargando=false;
    })
  }

  public actualizarHospital(hospital:Hospital){
      this.hospiltaService.actualizarHospitale(hospital._id,hospital.nombre)
          .subscribe((resp)=>{
            Swal.fire('actualizado',hospital.nombre,'success');
          });
  }

  public eliminarHospital(hospital:Hospital){
    this.hospiltaService.eliminarHospitale(hospital._id)
        .subscribe((resp)=>{
          this.cargarHospitales();
          Swal.fire('Eliminado',`Hospital ${hospital.nombre} eliminado.`,'success');
        });
  }


  async abrirswalModal(){
    let {value=''} = await Swal.fire<string>({
      title:'Crear hospital',
      text:'Ingrese el nombre del nuevo hospital',
      input: 'text',
      // inputLabel: 'Nombre hospital',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton:true
    })

    if(value.trim().length>0){
        this.hospiltaService.crearHospitale(value)
            .subscribe((resp)=>{
              this.cargarHospitales();
              Swal.fire('creado','Nuevo hospital registrado.','success');
            })
    }
  }

  public abrirModal(hospital:Hospital){
    this.modalImageService.abrirModal('hospitales',hospital._id,hospital.img);
  }

  public buscar(termino:string){

    if(termino.length==0){
      this.hospitales=this.hospitalesTemp;
      return;
    }

    this.busquedaService.buscar('hospitales',termino)
                        .subscribe((resultados:Hospital[])=>{
                          this.hospitales = resultados
                        });
  }


}
