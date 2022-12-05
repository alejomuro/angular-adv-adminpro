import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { ChartType } from 'chart.js';



@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent{


@Input()public title = "sin titulo";

@Input('labels') doughnutChartLabels:Label[]=[ 'label1', 'label2', 'label3' ];
@Input('data') doughnutChartData: MultiDataSet = [
    
       [ 350, 450, 100 ], ];
  public doughnut: ChartType='doughnut';
  public colors:Color[] =[
  {backgroundColor:['#6857E6','#009FEE','#F02059']}];

}
