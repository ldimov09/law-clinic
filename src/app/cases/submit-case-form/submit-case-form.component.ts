import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CaseService } from '../case.service';

@Component({
	selector: 'app-submit-case-form',
	templateUrl: './submit-case-form.component.html',
	styleUrls: ['./submit-case-form.component.scss']
})
export class SubmitCaseFormComponent {

	constructor(private caseService: CaseService, private router: Router) {}

	form = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		names: new FormControl('', [Validators.required]),
		title: new FormControl('', [Validators.required]),
		description: new FormControl('', [Validators.required]),
	});

	get Email() {
        return this.form.get('email');
    }
	get Names() {
		return this.form.get('names');
	}
	get Title() {
		return this.form.get('title');
	}
	get Description() {
		return this.form.get('description');
	}

	handleSubmission(form: FormGroup){
		const { names, email, title, description } = form.value;

        this.caseService.createCase({ email, title, names, description}).subscribe({
            next: (response: any) => {
                console.log(response);
                this.router.navigate(['/']);
            },
        });
	}
}
