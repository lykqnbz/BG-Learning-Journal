import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'umberUnit'
})
export class UmberUnitPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value < 1000) {
      return value / 100 + '百' + args
    } else if (value < 10000) {
      return value / 1000 + '千' + args
    }
  }
}
