import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ErrorService } from '../error.service';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
	constructor(private service: AuthService, private router: Router, private errorService: ErrorService, private snackBar: MatSnackBar) { }

	form = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required]),
	});

	get Email() {
		return this.form.get('email');
	}
	get Password() {
		return this.form.get('password');
	}

	handleLogin(form: FormGroup) {
		this.service.loginUser(form.value).subscribe({
			next: (response: any) => {
				if (!response.success) {
					this.openSnackBar(this.errorService.translateError(response.error), 'OK');
				} else {
					const token = response.result;
					localStorage.setItem('token', token);
					this.router.navigate(['/']);
				}
			},
		});
	}

	getuserdata() {
		console.log(this.service.user)
	}

	logout() {
		this.service.logout();
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action);
	}
}
