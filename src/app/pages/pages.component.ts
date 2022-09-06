import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  public linkTheme = document.querySelector('#theme');

  constructor() { }

  ngOnInit(): void {
    //ESTE CODIGO ES PARA QUE EL TEMA QUEDE GRABADO ASI SE RECARGUE LA PAGINA
    //Y SI BORRAN EL LOCALSTORAGE SE PONGA UN TEMA POR DEFECTO, EN ESTE CASO EL PURPURA 
    
      //obtenemos el localstorage y si viene vacio ponemos un tema por defecto
     const url = localStorage.getItem('theme')||'./assets/css/colors/purple-dark.css';
  
      //para cambiar el atributo de html en este caso queremos cambiar el HREF por url 
      // y cambia el tema cuando se le da click
      this.linkTheme?.setAttribute('href',url);
  
      //guardar el tema en el localstorage para luego guardarlo cuando la pagina recarge
     
      
    

  }
  


}
