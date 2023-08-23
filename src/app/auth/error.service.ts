import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ErrorService {

	//In order to avoid requesting and responding with data outside the ASCII table error codes are created and then translated...
	//..on the frontend. 

	errors: { [key: string]: string } = {
		'ERROR_IEP': 'Грешен e-mail или парола',
		'ERROR_UNA': 'Потребителят не е одобрен',
		'ERROR_WM': 'Грешен http метод',
		'ERROR_UE': 'Такъв потребител съществува',
		'ERROR_TMF': 'Качени са твърде много файлове',
		'ERROR_ID': 'Грешни данни',
	}

	constructor() { }


	translateError(error: string): string {
		return this.errors[error];
	}
}
