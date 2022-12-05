import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService:UsuarioService,
              private router:Router){} 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      //retorna el producto del observable
    return this.usuarioService.validarToken()
    .pipe(
      //si no esta autenticado lo redirijo al login
      tap(estaAutenticado=>{
        if(!estaAutenticado){
          this.router.navigateByUrl('/login');
        }
      })
    )
      
  }
  
}
