import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indianNumber'
})
export class IndianNumberPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) return '';

    // Convert number to Indian numbering system with commas
    return value.toLocaleString('en-IN');
  }
}
