import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SodebarService {

  menu:any[]=[
    {title:'Dashboard',
     icon:'mdi mdi-gauge',
     subMenu:[
      {title:'Main',url:'/'},
      {title:'ProgressBar',url:'/dashboard/progress'},
      {title:'Grafica',url:'/dashboard/grafica1'},
      {title:'Promesas',url:'/dashboard/promesas'},
      {title:'rxjs',url:'/dashboard/rxjs'}
     ]
    }
  ]

  constructor() { }
}
