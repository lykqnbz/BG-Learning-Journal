import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseComponent } from '@/library/theme-selector/base.component';
import { HeaderComponent } from '@/components/header/header.component';
import { FooterComponent } from '@/components/footer/footer.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './welcome.view.html',
  styleUrls: ['./welcome.view.scss']
})

export class WelcomeView extends BaseComponent {
  constructor() {
    super();
  }
}
