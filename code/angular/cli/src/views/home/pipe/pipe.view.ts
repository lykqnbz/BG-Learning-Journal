import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'pipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pipe.view.html',
})
export class PipeView {
  empty = {};
  num = 14443;
}
