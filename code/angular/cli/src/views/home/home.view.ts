import { Component } from '@angular/core';
import { BaseComponent } from '@/library/theme-selector/base.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InlineSVGModule, CommonModule, RouterModule],
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.scss']
})
export class HomeView extends BaseComponent {

  constructor() {
    super();
  }
}
