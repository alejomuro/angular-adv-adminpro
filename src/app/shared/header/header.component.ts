import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {
//aqui inyectamos el servicio para poder llamar al logout
  constructor( private usuarioService: UsuarioService ) { }
  //llamamos este logout en el HTML
  logout(){
    this.usuarioService.logout();
  }

  

}
