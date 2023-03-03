import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme= document.querySelector("#theme");

  constructor() {

    var urlTheme=localStorage.getItem('theme'); //||'/assets/css/colors/default.css';
    this.linkTheme?.setAttribute('href',urlTheme==null?'/assets/css/colors/default.css':urlTheme);

   }

   public changeTheme(theme:string){
    var url =`/assets/css/colors/${theme}.css`

    this.linkTheme?.setAttribute('href',url);
    localStorage.setItem('theme',url);
    this.checkCurrentTheme();
  }

  public checkCurrentTheme():void{
    var links=document.querySelectorAll('.selector');
    links.forEach(element =>{
    element.classList.remove("working");
    var btnTheme = element.getAttribute('data-theme');
    var btnThemeUrl =`/assets/css/colors/${btnTheme}.css`;
    var currentTheme = this.linkTheme?.getAttribute('href');

    if(btnThemeUrl===currentTheme){
        element.classList.add("working");
    }
    });
}

}
