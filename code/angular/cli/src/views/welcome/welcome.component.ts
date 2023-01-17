import { Component } from '@angular/core';

import { HeaderComponent } from '@/components/header/header.component';
import { FooterComponent } from '@/components/footer/footer.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <app-footer></app-footer>
  `,
})
export class WelcomeComponent { }
