import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from './interfaces/user';

@Pipe({
  name: 'fiterUsers'
})
export class FiterUsersPipe implements PipeTransform {

  transform(users: IUser[], role: string, approved?: string): IUser[] {
    const result = users.filter(u => u.role === role && (!approved || u.approved === Number(approved)));;
    console.log(users, role, approved);
    return result;
  }

}
