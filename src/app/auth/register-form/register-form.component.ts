import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ErrorService } from '../error.service';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
    getuserdata() {
        throw new Error('Method not implemented.');
    }

    users!: any[];

    specialties: {name: string, code: string}[] = [{ name: "Административно" , code: "A" }, { name: "Семейно и наследствено" , code: "FI" }, { name: "И Двете", code: "B" }]

    constructor(private authService: AuthService, private router: Router, private errorService: ErrorService, private snackBar: MatSnackBar) { }

    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(".+@uni-ruse.bg$")]),
        password: new FormControl('', [Validators.required]),
        names: new FormControl('', [Validators.required]),
        specialty: new FormControl('', [Validators.required]),
        fak_no: new FormControl('', [Validators.required, Validators.max(999999), Validators.min(100000)]),
    });

    get Names() {
        return this.form.get('names');
    }
    get Email() {
        return this.form.get('email');
    }
    get Password() {
        return this.form.get('password');
    }
    get Fak_no() {
        return this.form.get('fak_no');
    }
    get Specialty() {
        return this.form.get('specialty');
    }

    getAllUsers() {
        this.authService.getAllUsers().subscribe({
            next: (response: any) => {
                console.log("OK")
                console.log(response.result);
                this.users = response.result;
            },
        })
    }

    handleRegister(form: FormGroup) {
        const { names, email, password, fak_no, specialty } = form.value;

        this.authService.createUser({ email, password, names, fak_no, specialty}).subscribe({
            next: (response: any) => {
                if(response.success) {
                    this.router.navigate(['/'])
                }else{
                    this.openSnackBar(this.errorService.translateError(response.error), 'OK')
                }
            },
        });
    }

    openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action);
	}


}
