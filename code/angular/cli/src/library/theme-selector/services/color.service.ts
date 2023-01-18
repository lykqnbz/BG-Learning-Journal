import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import _twColors from 'tailwindcss/colors';

import { TailwindColor, TailwindColorPalette } from '../interfaces/tailwind-colors.interface';

@Injectable()
export class ColorService {
  twColors: TailwindColorPalette = _twColors as any;
  ignoredColors = ['inherit', 'transparent',];
  grayScaleColors = ['slate', 'gray', 'zinc', 'neutral'];
  private key = 'custom-current-color';
  private defaultColor: TailwindColor = {
    name: 'violet',
    shades: this.twColors['violet'],
  };
  allTailwindColors!: TailwindColor[];
  colors!: TailwindColor[];
  grayscale!: TailwindColor[];

  constructor() {
    this.setupColors();
  }
  setupColors(): void {
    this.allTailwindColors = Object.getOwnPropertyNames(this.twColors)
      .filter((color) => !this.ignoredColors.includes(color.toLowerCase()))
      .map((colorName) => {
        const mappedColor: TailwindColor = {
          name: colorName,
          shades: this.twColors[colorName],
        };
        return mappedColor;
      });

    const savedColor = localStorage.getItem(this.key);
    const color = this.colors.find((color) => color.name === savedColor) || this.defaultColor;
  }
}
