import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CaseService } from '../cases/case.service';
import { ICase } from '../interfaces/case';

@Component({
	selector: 'app-my-cases',
	templateUrl: './my-cases.component.html',
	styleUrls: ['./my-cases.component.scss']
})
export class MyCasesComponent {

	opened: string = 'home';
	cases!: ICase[];

	constructor(public authService: AuthService, private caseService: CaseService){
		
	}

	ngOnInit() {
		this.getAllCasesAssignedToThisUser();
	}

	changeWindow(window: string): void {
		this.opened = window;
	}

	getAllCasesAssignedToThisUser(){
		this.caseService.getCasesAssignedToUser(this.authService.user.id).subscribe({
			next:(response: any) => {
				if(response.success){
					this.cases = response.result;
				}
			},
			error:(error) => {
			}
 		})
	}
}
