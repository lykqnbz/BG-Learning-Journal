import { Component, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';



@Component({
  template: '',
})
export class BaseComponent implements OnDestroy {
  darkTheme!: boolean;
  combinedSub: Subscription;
  enum = {
    requires: Requires,
  };

  primary = '';
  primaryLight = '';
  primaryDark = '';
  primaryAlt = '';

  protected colorService: ColorService;
  protected themeService: ThemeService;

  constructor() {
    const injector = CustomInjector.getInstance();
    this.colorService = injector.get(ColorService);
    this.themeService = injector.get(ThemeService);

  }

  setGrayscale(): void {
    this.plain = this.darkTheme ? '-gray-600' : '-gray-400';
    this.plainInv = this.darkTheme ? '-gray-400' : '-gray-600';
    this.neutral = this.darkTheme ? '-gray-700' : '-gray-300';
    this.neutralInv = this.darkTheme ? '-gray-300' : '-gray-700';
  }

  setPrimaryColor(color: TailwindColor): void {
    this.primaryLight = this.darkTheme ? `-${color.name}-300` : `-${color.name}-500`;
    this.primary = this.darkTheme ? `-${color.name}-400` : `-${color.name}-600`;
    this.primaryAlt = this.darkTheme ? `-${color.name}-600` : `-${color.name}-400`;
    this.primaryDark = this.darkTheme ? `-${color.name}-500` : `-${color.name}-700`;
  }

  ngOnDestroy(): void {
    this.combinedSub.unsubscribe();
  }
}
