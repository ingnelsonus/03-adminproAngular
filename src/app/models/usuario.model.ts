import { environment } from "src/environments/environment";

const base_url=environment.base_url;

export class Usuario{

  constructor(
    public nombre: string,
    public email: string,
    public google: boolean,
    public password?:string,
    public img?:string,
    public rol?: string,
    public uid?: string,
  ){}

  get imagenUr(){

    //Google img
    if ( this.img.includes('https') ) {
      return this.img;
    }

    //BackEnd img
    if(this.img){
      return `${base_url}/upload/usuarios/${this.img}`;
    }else{
      return `${base_url}/upload/usuarios/no-image`;
    }
  }


}
