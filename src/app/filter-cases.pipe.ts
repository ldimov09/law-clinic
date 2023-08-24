import { Pipe, PipeTransform } from '@angular/core';
import { ICase } from './interfaces/case';

@Pipe({
  name: 'filterCases'
})
export class FilterCasesPipe implements PipeTransform {

  transform(cases: ICase[], status: string, spec?: string): ICase[] {
    return cases!?.filter(c => c.status === status && (c.specialty == '0' || spec === c.specialty || !spec))

    //IF the case is the same status as the given AND [specialty is not gievn OR the case specialty is 0 (on not approved cases)..
    //.. OR the sepecialty of the case is tteh same as the given] THEN it will be displayed in the opened tab.
  }

}
