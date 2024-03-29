import { Pipe, PipeTransform } from '@angular/core';
import { isEmpty } from 'lodash-es';

@Pipe({
  name: 'objIsEmpty',
})
export class ObjIsEmptyPipe implements PipeTransform {

  transform(value: any, ...arg: any) {
    return !isEmpty(value);
  }
}
