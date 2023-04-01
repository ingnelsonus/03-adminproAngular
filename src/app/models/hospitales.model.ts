export class Hospital{


constructor(
  public nombre:string,
  public _id?:string,
  public usuario?:_HospitalUser,
  public img?:any,
){}




}


interface _HospitalUser{
  _id:string;
  nombre:string;
  img:string
}
