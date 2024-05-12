import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'year',
  standalone: true
})
export class YearPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const date = new Date(value);
    return date.getFullYear();
  }

}
