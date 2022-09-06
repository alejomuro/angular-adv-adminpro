import { APP_BASE_HREF } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  //seleccion al elemento en este caso el color del tema, por el ID
  public linkTheme = document.querySelector('#theme');

  constructor() { }

  ngOnInit(): void {
  }

  changeTheme(theme:string){
    
    //cambiamos todo el url que obtubimos es ecir el link theme,y en el color como tal colocar
    //lo que venga en el theme 
   const url= `./assets/css/colors/${theme}.css`

    //para cambiar el atributo de html en este caso queremos cambiar el HREF por url 
    // y cambia el tema cuando se le da click
    this.linkTheme?.setAttribute('href',url);

    //guardar el tema en el localstorage para luego guardarlo cuando la pagina recarge
    localStorage.setItem('theme', url);
  }

}
