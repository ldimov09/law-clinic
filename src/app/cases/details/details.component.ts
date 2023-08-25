import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from '../case.service';
import { ICase } from 'src/app/interfaces/case';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
	id: string = this.activatedRoute.snapshot.params?.['id'];

	case!: ICase;

	constructor(private activatedRoute: ActivatedRoute, private router: Router, private caseService: CaseService) { }

	ngOnInit() {
		this.caseService.getOneCase(this.id).subscribe({
			next: (response: any) => {
				if (response?.success!) {
					this.case = response?.result!;
				} else {

				}
			},
			error: (error: string) => {
			},
		});
	}
}
