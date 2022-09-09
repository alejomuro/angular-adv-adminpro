import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then(usuarios =>{
      console.log(usuarios);
    })

    // const promesa = new Promise((resolve,reject)=>{
    //   if(false){
    //     resolve('hola mundo');
    //   }else{
    //     reject('algo salio mal');
    //   }

      
  //   });
  //   //para capturar cuando se resuelve de manera correcta , el resolve
  //  //el mensaje es para imprimir lo que esta en el resolve es decir el hola mundo
  //   promesa.then((mensaje)=>{
  //     console.log(mensaje);
  //   })
  //   //para capturar el error del reject de arriba
  //   .catch(error=> console.log('error en mi promesa', error));
    
  //   console.log('fin del init');
  }

  //.json necesito traer el body en forma de json, y regresa otra promesa otro then
  getUsuarios(){

    return  new Promise(resolve=> {
      fetch('https://reqres.in/api/users?page=2')
      .then(resp => resp.json())
      .then(body => resolve(body.data));
    })
  
    
  }

}
