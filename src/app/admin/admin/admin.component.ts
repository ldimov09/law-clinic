import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CaseService } from 'src/app/cases/case.service';
import { ICase } from 'src/app/interfaces/case';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
	opened = 'home';
	cases!: ICase[];

	authService: AuthService;

	constructor(authService: AuthService, private caseService: CaseService) {
		this.authService = authService;
	}

	ngOnInit() {
		this.caseService.getAllCases().subscribe({
			next: (response: any) => {
				if (response.success) {
					this.cases = response.result;
				} else {
					console.log(response);
				}
			},
			error: (error) => {
				console.log(error);
			}
		})
	}

	changeWindow(newWindow: string) {
		this.opened = newWindow;
	}
}
