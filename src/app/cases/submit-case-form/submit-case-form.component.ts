import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CaseService } from '../case.service';
import { ErrorService } from 'src/app/auth/error.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import emailjs from '@emailjs/browser';
@Component({
	selector: 'app-submit-case-form',
	templateUrl: './submit-case-form.component.html',
	styleUrls: ['./submit-case-form.component.scss']
})
export class SubmitCaseFormComponent {

	selectedFiles: File[] | null = []

	selectedFileNames: string[] = [];
	constructor(private caseService: CaseService, private router: Router, private errorService: ErrorService, private snackBar: MatSnackBar) { }

	form = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		names: new FormControl('', [Validators.required]),
		title: new FormControl('', [Validators.required]),
		description: new FormControl('', [Validators.required]),
		file: new FormControl(null, [Validators.required]),
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

	handleSubmission(form: FormGroup) {
		const formData = new FormData();
		formData.append('title', this.form.value.title!);
		formData.append('description', this.form.value.description!);
		formData.append('email', this.form.value.email!);
		formData.append('names', this.form.value.names!);
		if (this.selectedFiles != null) {
			for (const file of this.selectedFiles) {
				formData.append('file[]', file);
			}
		}


		/*const { names, email, title, description } = form.value;*/

		this.caseService.createCase(formData).subscribe({
			next: (response: any) => {
				if (response.success) {
					this.router.navigate(['/']);
				} else {
					this.openSnackBar(this.errorService.translateError(response.error), 'OK')
				}
			},
		});


		let names = form.value.names



		let about = form.value.title
		let email = form.value.email
		let description = form.value.description
		let params = {
			names,
			about,
			email,
			description,

		}
		let serviceId = "service_7bv2bic"
		let templateId = "template_22a7s5e"

		emailjs.send(serviceId, templateId, params, "oSM0BPuigetShF4Z3").then(res => {

		})


	}

	onFileSelected(event: Event): void {
		this.selectedFileNames = []; // Reset the selectedFileNames on every selection
		this.selectedFiles = []; // Reset the selectedFiles on every selection
		const input = event.target as HTMLInputElement;
		const files = input?.files!;
		if (files!.length > 0) {
			for (let i = 0; i < files.length; i++) {
				this.selectedFileNames.push(files[i].name);
				this.selectedFiles?.push(files[i]);
			}

		} else {
			this.selectedFileNames = []; // Reset the selectedFileNames if no file is selected
		}
		// Do something with the selected file
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action);
	}
}
