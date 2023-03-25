export class Usuario{

  constructor(
    public nombre: string,
    public email: string,
    public google: boolean,
    public password?:string,
    public rol?: string,
    public uid?: string,
  ){

  }

}
