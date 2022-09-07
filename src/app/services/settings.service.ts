import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');

  constructor() {
      //ESTE CODIGO ES PARA QUE EL TEMA QUEDE GRABADO ASI SE RECARGUE LA PAGINA
    //Y SI BORRAN EL LOCALSTORAGE SE PONGA UN TEMA POR DEFECTO, EN ESTE CASO EL PURPURA 
    
      //obtenemos el localstorage y si viene vacio ponemos un tema por defecto
      const url = localStorage.getItem('theme')||'./assets/css/colors/purple-dark.css';
  
      //para cambiar el atributo de html en este caso queremos cambiar el HREF por url 
      // y cambia el tema cuando se le da click
      this.linkTheme?.setAttribute('href',url);
   }

   changeTheme(theme:string){
    
    //cambiamos todo el url que obtubimos es decir el link theme,y en el color como tal colocar
    //lo que venga en el theme 
   const url= `./assets/css/colors/${theme}.css`

    //para cambiar el atributo de html en este caso queremos cambiar el HREF por url 
    // y cambia el tema cuando se le da click
    this.linkTheme?.setAttribute('href',url);

    //guardar el tema en el localstorage para luego guardarlo cuando la pagina recarge
    localStorage.setItem('theme', url);

   this.checkCurrentTheme();
    
  }

  checkCurrentTheme(){
    //seleccion al elemento en este caso el color del tema, por el ID
    const links=document.querySelectorAll('.selector');
    
    //barremos cada uno de los elementos de clase selector.
    //lo primero que haremos es borrar la clase working si alguno la tuviera

    links.forEach(elem=>{
      elem.classList.remove('working');

      //necesitamos saber cual es el url del tema actual y del tema del boton que queremos evaluar,
      //y si los dos hacen match le colocamos a esos elementos la clase working
      //del elemento obtenemos el data-theme y luego obtenemos del linktheme
      const btnTheme= elem.getAttribute('data-theme');
      const btnThemeUrl=`./assets/css/colors/${btnTheme}.css`;
      //depues que lo obtenemos neceito extraerlo y lo extraemos de la iguiente manera
      const currentTheme = this.linkTheme?.getAttribute('href');

      if(btnThemeUrl===currentTheme ){
        elem.classList.add('working');
      }
});
}
}
