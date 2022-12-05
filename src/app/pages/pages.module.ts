import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



//modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent
    
  ],
  exports:[
    PagesComponent,
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    IncrementadorComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ComponentsModule,
    
   
]
})
export class PagesModule { }
