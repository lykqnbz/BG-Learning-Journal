import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseComponent } from '@/library/theme-selector/base.component';
import { ShareModuleModule } from '@/app/share.module';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [ShareModuleModule, RouterModule],
  templateUrl: './welcome.view.html',
  styleUrls: ['./welcome.view.scss']
})

export class WelcomeView extends BaseComponent {
  constructor() {
    super();
  }
}
