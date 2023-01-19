import { Component } from '@angular/core';
import { TimeStatusCharts } from '@/components/charts/charts.component';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [TimeStatusCharts],
  templateUrl: './charts.view.html',
})
export class ChartsView { }
