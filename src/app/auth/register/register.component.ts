import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'
  ]
})
export class RegisterComponent  {
  public formSubmited=false;
  //definimos el formulario reactivo, y establecemos este formulario en el html
  //y los asociamos a los input para ver la informacion
  public registerForm=this.fb.group({
    nombre:['Alejandro',Validators.required],
    email:['test100@gmail.com',[ Validators.required, Validators.email] ],
    password:['123456',Validators.required],
    password2:['123456',Validators.required],
    terminos:[true, Validators.required]
  },{
    validators:this.passwordIguales('password','password2')
  });


  // importamos el form builder
constructor(private fb:FormBuilder,
            private usuarioService:UsuarioService,
            private router:Router) {}

//metodo para capturar la informacion
 crearUsuario(){
  this.formSubmited=true;
  console.log(this.registerForm.value);

  if(this.registerForm.invalid){
    return;
  }
  //si el formulario es valido realizar el posteo
  this.usuarioService.crearUsuario( this.registerForm.value )
  .subscribe(resp =>{
   //navegar al dashboard
   this.router.navigateByUrl('/');
  },(err)=>{
    //si sucede un error
    //Titulo:Error, mensaje:err.error.msg, Icono:error
    Swal.fire('Error',err.error.msg,'error' );

  });
}

//necesito el nombre del campo como argumento
campoNoValido(campo:string):Boolean{
//si el formulario se posteo y el campo es invalido
if(this.registerForm.get(campo)?.invalid && this.formSubmited){
  return true;

}else{ 
  return false;
}

}

contrasenasNoValidas(){
  const pass1= this.registerForm.get('password')?.value;
  const pass2= this.registerForm.get('password2')?.value;

  if ((pass1 !== pass2)&& this.formSubmited  ){
    return true;
  }else{
    return false;
  }

}

aceptaTerminos(){
  return !this.registerForm.get('terminos')?.value && this.formSubmited;
}

passwordIguales(pass1Name:string, pass2Name:string){
  //la funcion se dispara con el formGroup, referencia al formulario en el cual se esta ejecutando la funcion
  return (formGroup:FormGroup) => {
    const pass1Control = formGroup.get(pass1Name);
    const pass2Control = formGroup.get(pass2Name);

    if(pass1Control?.value === pass2Control?.value ){
      pass2Control?.setErrors(null)
    } else{
      //es un objeto que dice cual es el error
      pass2Control?.setErrors({noEsIgual:true})
    }
  }
}

}