import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vatAdded'
})
export class VatAddedPipe implements PipeTransform {

  transform(value: number, rate: number): number {
    return (value * ((100 + rate) / 100));
  }

}
// ng g pipe vatAdded --skip-tests 