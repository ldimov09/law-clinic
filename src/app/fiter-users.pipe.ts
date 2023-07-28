import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from './interfaces/user';

@Pipe({
  name: 'fiterUsers'
})
export class FiterUsersPipe implements PipeTransform {

  transform(users: IUser[], role: string, approved?: string): IUser[] {
    const result = users.filter(u => u.role === role && (!approved || u.approved === Number(approved)));
    console.log(users, role, approved);
    return result;
  }

  //If the users role matches the given AND [no "approve" requierment is given... 
  //... OR the "approved" field of the user (number) matches the given (string converted to number) ]


}
