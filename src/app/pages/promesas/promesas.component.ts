import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})

export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(usuarios=>console.log(usuarios));

    // const promesa =new Promise((resolve,reject)=>{
    //   if(false){
    //     resolve("hola mundo, creating a promise");
    //   }else{
    //     reject("something was wrong");
    //   }
    // });

    // promesa.then((mensaje)=>{
    //     console.log(mensaje);
    // })
    // .catch(error=>console.log("Error en la promesa ",error));

    // console.log("fin del init");
  }

  public getUsuarios(){

    var promesa = new Promise(resolve=>{
      fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(body=>resolve(body.data));
    });

   return promesa;

  }

}
