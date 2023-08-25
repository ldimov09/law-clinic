import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { CaseService } from 'src/app/cases/case.service';
import { ICase } from 'src/app/interfaces/case';
import { IUser } from 'src/app/interfaces/user';
import { MatSnackBar } from "@angular/material/snack-bar";
import { DialogStudentsComponent } from '../dialog-students/dialog-students.component';
import { DialogSpecialtyComponent } from '../dialog-specialty/dialog-specialty.component';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
	opened = 'home';
	cases!: ICase[];

	test!: string;

	role!: string;
	spec!: string;
	authService: AuthService;

	users: IUser[] = [];
	occupiedUsers: number= 0;

	usersLength!: number;

	constructor(authService: AuthService, private caseService: CaseService, private snackBar: MatSnackBar, public dialog: MatDialog) {
		this.authService = authService;
		this.role = this.authService.user.role;
		this.spec = this.authService.user.specialty;
	}

	//====BASE===

	ngOnInit() {
		this.updateCases(true); // Parameter true means that the function will update the cases anf the users
	}

	changeWindow(newWindow: string) { //For the sidebar tabs to work
		this.opened = newWindow;
	}

	//====UPDATE CASES USERS AND STATUS ====


	updateCases(cont?: boolean) {
		//The cont (stands for continue) variable indicates whether the function continues with updating the users...
		//...(as is needed in ngOnInit) or doesn't (as is needed it the update button in the admin panel).
		this.caseService.getAllCases().subscribe({
			next: (response: any) => {
				if (response.success) {
					this.cases = response.result;
					if (cont) {
						//If const is true, update the users list
						this.loadUsersAndOccupiedUsers();
					}
				} else {
				}
			},
			error: (error) => {
				console.log(error);  //TODO: Handle errors properly
			}
		})
	}

	loadUsersAndOccupiedUsers() {
		this.authService.getAllUsers().subscribe((response: any) => {
			this.users = response.result;

			this.authService.getOccupiedUsers().subscribe((response: any) => {
				this.occupiedUsers = response.result;
			});
		});
	}

	/*
	updateUsers() {
		this.authService.getAllUsers().subscribe((response: any) => {
			if (response.success) {
				this.users = response.result;
				this.usersLength = this.users.length;
				this.getNumberOccupiedStudents()
			} else {
			}
		})
	}*/

	changeCaseStatus(id: number, status: string, specialty?: string | number) {
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
	}

	changeUserStatus(id: number, status: number) {
		let oldStatus: number, index: number;
		this.users = this.users!.map((user, i) => { //Making an optimistic update: Updating the approved field for the user to see instantly before even sending the request.
			if (user.id == id) {
				oldStatus = user.approved;
				user.approved = status;
				index = i
			}
			return user;
		})
		this.authService.changeStatus(id, status).subscribe({
			next: (response: any) => {
				if (!response.success) {
					this.users![index].approved = oldStatus; //If something goes wrong restore the previous status.
				}
			},
			error: (error: any) => {
				this.users![index].approved = oldStatus; //If something goes wrong restore the previous status.
				console.log(error);  //TODO: Handle errors properly
			}
		})
	}

	/*
	getNumberOccupiedStudents() {
		this.authService.getNumberOcSt().subscribe((response: any) => {
			this.numberOcSt = Number(response.result);
			console.log('Trigger', this.numberOcSt);
			this.authService.triggerDataUpdate();
		});
	}
	*/

	//====DIALOGS====

	openSpecilatyDialog(id: number): void {
		const dialogRef = this.dialog.open(DialogSpecialtyComponent, {
			data: { selected: "" }, // Selected is <empty string> for the dialog to fill in the selected option
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.changeCaseStatus(id, 'Approved', result!);
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

	assignUsersToCase(users: IUser[], c: ICase): void {
		const ids = users.map(user => user.id); //Get the Id-s of the users
		const idsting = ids.join(', '); //Join the ids together adn send them to the server
		this.caseService.assignUsersToCase(c.id, idsting).subscribe({
			next: (response: any) => {
				if (response.success) {
					this.changeCaseStatus(c.id, 'Working');
				}
			},
			error: (response) => {
				console.log(response); //TODO: Handle errors properly
			}
		})
	}

	//====SNACK BAR====


	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action);
	}
}
