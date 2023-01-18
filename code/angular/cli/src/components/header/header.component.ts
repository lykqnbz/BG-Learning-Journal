import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { getRandomIcon } from '@/utils/index';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [InlineSVGModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  svg = getRandomIcon();
  public bannerImgSrc = '../../assets/image/default_1.png';

  ngOnInit(): void {
    console.log(this.svg);
  }
}

