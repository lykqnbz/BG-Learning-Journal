import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bagen';
  isDisabled = false;
  red = 'red';
  direction = 'left';
  message = '这里右转';

  changeDirection() {
    if (this.direction === 'left') {
      this.direction = 'right'
      this.message = '这里左转';
    } else {
      this.direction = 'left'
      this.message = "这里右转";
    }
  }
}
