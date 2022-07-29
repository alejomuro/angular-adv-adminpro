import { Component} from '@angular/core';

@Component({
  selector: 'app-nopagesfound',
  templateUrl: './nopagesfound.component.html',
  styleUrls: ['./nopagesfound.component.css'
  ]
})
export class NopagesfoundComponent{
//getFullYear para obtener el año actual
  year=new Date().getFullYear()
  
}
