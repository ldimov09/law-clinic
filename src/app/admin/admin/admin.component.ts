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

	role!: string;
	spec!: string;
	authService: AuthService;
	
	constructor(authService: AuthService, private caseService: CaseService) {
		this.authService = authService;
		this.role = this.authService.user.role;
		this.spec = this.authService.user.specialty;
	}

	ngOnInit() {
		this.updateCases();
	}

	changeWindow(newWindow: string) {
		this.opened = newWindow;
	}

	updateCases(){
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

	rejectCase(id: number) {
		this.caseService.changeStatus(id, 'Rejected').subscribe({
			next: (response: any) => {
			},
			error: (error: any) => {
				console.log(error);
			}
		})
	}
}
