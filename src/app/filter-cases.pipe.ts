import { Pipe, PipeTransform } from '@angular/core';
import { ICase } from './interfaces/case';

@Pipe({
  name: 'filterCases'
})
export class FilterCasesPipe implements PipeTransform {

  transform(cases: ICase[], status: string, spec?: string): ICase[] {
    return cases.filter(c => c.status === status && (c.specialty == '0' || spec === c.specialty || !spec))
  }

}
