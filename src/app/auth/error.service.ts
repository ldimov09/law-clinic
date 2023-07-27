import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ErrorService {

	errors: { [key: string]: string } = {
		'ERROR_IEP': 'Грешен e-mail или парола',
		'ERROR_UNA': 'Потребителят не е одобрен',
		'ERROR_WM': 'Грешен http метод',
		'ERROR_UE': 'Такъв потребител съществува',
	}

	constructor() { }

	translateError(error: string): string {
		return this.errors[error];
	}
}
