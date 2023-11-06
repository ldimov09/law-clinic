import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from '../case.service';
import { ICase } from 'src/app/interfaces/case';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from 'src/app/interfaces/user';
import { DialogSpecialtyComponent } from 'src/app/admin/dialog-specialty/dialog-specialty.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
	loggedUser!: IUser;
	id: number = Number(this.activatedRoute.snapshot.params?.['id']);
	users!: IUser[]
	guest!: IUser;
	case!: ICase;
	displayStatus!: string;

	constructor(private activatedRoute: ActivatedRoute, private router: Router, private caseService: CaseService, private snackBar: MatSnackBar, public dialog: MatDialog, private authService: AuthService) { }

	ngOnInit() {
		this.loggedUser = this.authService.user;
		this.getOneCase();
	}

	getAllUsers() {
		this.authService.getAllUsers().subscribe({
			next: (response: any) => {
				if (response.success) {
					this.users = response.result;
				}
			},
			error: (error: string) => {
			},
		});
	}

	getOneCase() {
		const currentId = this.activatedRoute.snapshot.params?.['id'];
		this.caseService.getOneCase(currentId).subscribe({
			next: (response: any) => {
				if (response.success) {
					this.case = response.result;
					if (this.case.status == 'Working') {
						this.displayStatus = 'Работи се'
					}
					if (this.case.status == 'Rejected') {
						this.displayStatus = 'Отхвърлен'
					}
					if (this.case.status == 'Done') {
						this.displayStatus = 'Завършен'
					}
					if (this.case.status == 'Not Approved') {
						this.displayStatus = 'Неодобрен'
					}
					if (this.case.status == 'Approved') {
						this.displayStatus = 'Одобрен'
					}
					this.getAllUsers();
				}
			},
			error: (err: any) => {
				console.log(err); // TODO: Handle errors properly
			},
		})
	}
}

