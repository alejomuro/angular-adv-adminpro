import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";

const routes:Routes=[
    {
        path:'dashboard', component:PagesComponent,
        children:[
          //el titulo es para mostralo en cada titulo de cada componente
          {path:'', component:DashboardComponent, data:{titulo: 'dashboard'}},
          {path:'progress', component:ProgressComponent, data:{titulo: 'progressBar'}},
          {path:'grafica1', component:Grafica1Component, data:{titulo:'grafica 1'}},
          {path:'account-settings', component:AccountSettingsComponent, data:{titulo: 'ajuste de cuenta'}},
          {path:'promesas', component:PromesasComponent, data:{titulo: 'promesas'} },
          {path:'rxjs', component:RxjsComponent, data:{titulo: 'rxjs'}}
          
        ]
      },

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class PagesRoutingModule{}

