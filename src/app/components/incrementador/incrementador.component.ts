import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  //@Input('alias') progress:number=50;
  @Input() progress:number=50;
  @Input() btnClass:string='btn-primary';

  @Output() progressChanded:EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.btnClass =`btn ${this.btnClass}`;
  }

  cambiarValor(valor:number){

    if(this.progress>=100 && valor>=0){
      this.progressChanded.emit(100);
      return this.progress=100;
    }

    if(this.progress<=0 && valor<0){
      this.progressChanded.emit(0);
      return this.progress=0;
    }

    this.progressChanded.emit(this.progress+valor);
    return this.progress=this.progress+valor;
  }

  onChange( newValue:number ){

    if(newValue>=100){
      this.progress=100;
    }else if(newValue<=0){
      this.progress=0;
    }
     else{
      this.progress=newValue;
     }

    this.progressChanded.emit(this.progress);

  }

}
