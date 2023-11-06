import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ICase } from 'src/app/interfaces/case';
import { DialogSpecialtyComponent } from '../dialog-specialty/dialog-specialty.component';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from 'src/app/interfaces/user';
import { DialogStudentsComponent } from '../dialog-students/dialog-students.component';
import { CaseService } from 'src/app/cases/case.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
	selector: 'app-case-actions',
	templateUrl: './case-actions.component.html',
	styleUrls: ['./case-actions.component.scss']
})
export class CaseActionsComponent {
	@Input() id?: number;
	@Input() case!: ICase;
	@Input() cases?: ICase[];
	@Input() users!: IUser[];
	@Input() forDetPage?: Boolean;
	@Output() casesChange = new EventEmitter<ICase[]>();
	role: string = this.authService.user.role;
	caseService!: CaseService;

	constructor(public authService: AuthService, public dialog: MatDialog, caseService: CaseService, private snackBar: MatSnackBar, private router: Router) {
		this.dialog = dialog;
		this.caseService = caseService;
	}

	//====DIALOGS====

	openSpecilatyDialog(id: number): void {
		const dialogRef = this.dialog.open(DialogSpecialtyComponent, {
			data: { selected: "" }, // Selected is <empty string> for the dialog to fill in the selected option
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.changeCaseStatus(id, 'Approved', result);
			}
		});
	}

	openStudentDialog(c: ICase): void { //TODO: Filter by specialty given by the tab
		const dialogRef = this.dialog.open(DialogStudentsComponent, {
			data: { users: this.users!.filter(u => u.role == 'user' && u.approved == 1 && (u.specialty == 'B' || u.specialty == c.specialty)) },
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.assignUsersToCase(result, c);
			}

		});
	}

	//====CASES====

	assignUsersToCase(users: IUser[], c: ICase): void {
		const ids = users.map(user => user.id); //Get the Id-s of the users
		const idsting = ids.join(', '); //Join the ids together adn send them to the server
		this.caseService.assignUsersToCase(c.id ? c.id : this.id!, idsting).subscribe({
			next: (response: any) => {
				if (response.success) {
					this.changeCaseStatus(c.id ? c.id : this.id!, 'Working', c.specialty);
				}
			},
			error: (response) => {
				console.log(response); //TODO: Handle errors properly
			}
		})
	}

	changeCaseStatus(id: number, status: string, specialty?: string | number) {
		if (this.forDetPage) {
			this.caseService.changeStatus(this.id!, status, specialty).subscribe({
				next: (response: any) => {
					this.router.navigate([this.authService.user.role == 'user' ? '/my-cases' : '/admin'])
				},
				error: (error: any) => {
					console.log(error); //TODO: Handle errors properly
				}
			});
			return;
		}
		let oldStatus: string, oldSpec: string | number, index: number; //Saving the old status and specialty in case something goes wrong with the request
		this.cases = this.cases!.map((c, i) => { //Making an optimistic update: Updating the approved field for the user to see instantly before even sending the request.
			if (c.id == id) {
				oldStatus = c.status;
				oldSpec = c.specialty;
				c.status = status;
				c.specialty = specialty!;
				index = i
			}
			return c;
		})
		this.caseService.changeStatus(id, status, specialty).subscribe({
			next: (response: any) => {
				if (!response.success) {
					this.cases![index].status = oldStatus; //If something goes wrong restore the previous status and specialty.
					this.cases![index].specialty = oldSpec;
				} else {
					this.openSnackBar('Успешно променен статус!', 'OK')
				}
			},
			error: (error: any) => {
				this.cases![index].status = oldStatus; //If something goes wrong restore the previous status and specialty.
				this.cases![index].specialty = oldSpec;
				console.log(error);  //TODO: Handle errors properly
			}
		})
		this.casesChange.emit(this.cases);
	}

	//====SNACK BAR====
	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action);
	}
}
