import { Component, OnDestroy} from '@angular/core';
import {  ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{
  public titulo!:string;
  public tituloSubs$!:Subscription;
  //para leer el argumento en la ruta
  constructor(private router:Router) {
  this.tituloSubs$ = this.getArgumentosRuta() 
                     //desestructuracion del objeto
                          .subscribe( ({titulo}) => {
                              this.titulo=titulo;
                               document.title= `adminPro - ${titulo}`;
});
  }
  ngOnDestroy(): void {
    //para hacer la limpieza
  this.tituloSubs$.unsubscribe();
  }
  getArgumentosRuta(){
   return this.router.events
    .pipe(
      //si event es una instancia de activatedEnd, solo deberiamos ver las instancias de activationEnd
      filter((event):event is ActivationEnd => event instanceof ActivationEnd ),
      filter( (event:ActivationEnd) => event.snapshot.firstChild === null),
      map( (event:ActivationEnd) => event.snapshot.data),
)
}
}
