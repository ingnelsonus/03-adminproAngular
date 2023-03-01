import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public title1:string="No title";
  public labels1: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public data1: ChartData<'doughnut'> = {
    labels: this.labels1,
    datasets: [
      { data: [ 350, 450, 100 ] }
    ]
  };

  public title2:string="Title grafica 2";
  public labels2: string[] = [ 'Cat1', 'Cat2', 'Cat3' ];
  public data2: ChartData<'doughnut'> = {
    labels: this.labels2,
    datasets: [
      { data: [ 100, 500, 800 ] }
    ]
  };



}
