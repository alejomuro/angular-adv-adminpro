import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription} from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy{
  public intervalSubs:Subscription;
  //OBSERVABLES
  //para notificar a todas la personas que estan subscritas, del valor emitido, hacemos uso del observer.next
  //que es el siguiente valo que queremos emitir, emitimos i

  constructor() { 
    
    
    //retry seguira itentando el codigo las veces que sea el valor en entre parentesis,
    //si no se le coloca nada denteo del parentesis lo va a probar infinito
  //    this.retornaObservable().pipe(
  //     retry(2)
  //   ).subscribe(
  //     //en la subscripcion voy a poner el valor que recibo,
  //     //error para manejar el error 
  //     //complete para cuando se cancele o finalice y no recibe ningun argumento
  //     valor => console.log('subs:', valor),
  //     error =>console.warn('error:',error),
  //     ()=>console.info('obs terminado')
  //   );

  //
  //todos los argumentos que reciba el subscribe mandaselos a la funcion CONSOLE.LOG y los imprime
 this.intervalSubs = this.retornaIntervalo().subscribe(console.log)
 }
  ngOnDestroy(): void {
    //para que se detenga la subscripcion y se destruya el componente cuando se cambie a otro
    this.intervalSubs.unsubscribe();
  }
 //operador take es para ver cuantos valores quiere en este 
 //el MAP sirve para transformar la informacion que recibe el observable y mutarla de la manera que necesito
  retornaIntervalo():Observable<number>{
    return interval(100)
                      .pipe(
                     // take(10),
                      map(valor => valor + 1),
                      filter(valor => (valor % 2 === 0)?true : false ),
                     
                      
                      );
}

  retornaObservable():Observable<number>{
    let i = -1;
    return new Observable<number>(observer =>{
      
      //para poder cancelar el intervalo se asigna a una costante, luego se limpia y se completa
      //dentro de la condicion
    const intervalo = setInterval(()=>{

       i++;
       observer.next(i);

       if(i === 4){
        clearInterval(intervalo);
        observer.complete();
       }

       if(i === 2){
        observer.error('i llego al valor de 2');
       }
},1000)
    });
    
  }
  
}
