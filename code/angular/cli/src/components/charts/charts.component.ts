import { Component } from '@angular/core';
import { RZTimeStatusChartModule } from '@rickzhou/ngx-cdk/time-status-chart';
import { MockData } from './mockData';

@Component({
  selector: 'app-time-status-big-data-charts',
  standalone: true,
  imports: [RZTimeStatusChartModule],
  template: `<rz-time-status-chart [data]="data"></rz-time-status-chart>`,
})
export class TimeStatusCharts {
  public data = MockData;
}
