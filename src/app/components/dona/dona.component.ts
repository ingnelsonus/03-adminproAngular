import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType,Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  public doughnutChartType: ChartType = 'doughnut';
  @Input() title:string="Without title";
  @Input() public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  @Input() public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] }
    ]
  };

}
