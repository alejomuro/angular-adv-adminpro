import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
//el tap es para disparar un efecto secundario
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';






//este declare es para hacer el logout del google identity, para usar el objeto global que me ofrece google
declare const google:any;

const base_url=environment.base_url;

declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2:any;

  constructor(private http: HttpClient,
              private router:Router,
              private ngZone:NgZone) {
//esto se va a ejecutar una sola vez, cada vez que entramos por primera vez a la aplicacion
//this.googleInit();

    }

  googleInit(){
    return new Promise((resolve) =>{
      console.log('google init');
      
      gapi.load('auth2',()=>{
        this.auth2=gapi.auth2.init({
          client_id: '801941627504-i4jg8opaclaiss3sjsrkscmdenjrhe3k.apps.googleusercontent.com',
          cookiepolicy:'single_host_origin',
        });
        resolve(this.auth2);
      });

    })
    
   
  }

  //navigateByUrl para redireccionar al login cuando se hace el logout
  logout(){
    localStorage.removeItem('token');
    
   google.accounts.id.revoke('duwraskaespinoza@gmail.com',()=>{
    this.ngZone.run(() =>{
      this.router.navigateByUrl('/login');
    })
})

}

  validarToken():Observable<boolean>{
    //UTILIZAMOS EL SERVICIO EN EL AUTH GUARD
    //extraigo el token, si no existe traigo un string vacio
    const token=localStorage.getItem('token')||'';
    //hago la peticion al backend, hace la peticion y obtiene una respuesta
   return this.http.get(`${base_url}/login/renew`, {
      headers:{
        'x-token':token
      }
      //si la peticion es correcta lo pasamos por este pipe
    }).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token', resp.token);
      }),
      //transformamos la respuesta a un valor booleano
      //el OF permite crear un observable en base al valor que esta entre parentesis
      map(resp=>true),
      catchError(err=>of(false))
      )
    
  }
   
  //va a ser de tipo registerForm de la interface que acabamos de crear(carpeta interfaces, arch register-form.interface)
  //el /usuario es como sale en la peticion en postman, en crear ususario
  crearUsuario(formData:RegisterForm){
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap( (resp:any)=>{
        localStorage.setItem('token', resp.token);
        
      })
    )

  }

  login(formData:LoginForm){
    return this.http.post(`${base_url}/login`, formData)
    //el tap recibe lo que responda esta peticion
    //el msg es el token
    .pipe(
      tap( (resp:any)=>{
        localStorage.setItem('token', resp.token);
        
      })
    )

  }
  //esto se implementa para realizar el posteo del token
  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`,{token} )
    .pipe(
      tap( (resp:any)=> {
       // console.log(resp);
        localStorage.setItem('token', resp.token);
      } )
    )
  }

}
