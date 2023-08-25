import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ICase } from 'src/app/interfaces/case';
Chart.register(...registerables);


@Component({
	selector: 'app-chart-cases-spec',
	templateUrl: './chart-cases-spec.component.html',
	styleUrls: ['./chart-cases-spec.component.scss']
})
export class ChartCasesSpecComponent {
	@Input() data!: number[];

	ngOnInit() {
		let myChart = new Chart("specchart", {
			type: 'pie',
			data: {
				labels: ['Неодобрени', 'Административно', 'Семейно и наследствено',],
				datasets: [{
					label: 'Брой казуси',
					data: this.data,
					backgroundColor: ["#1984c5", "#e2e2e2", "#e14b31"],
					borderColor: [
						'rgba(103,58,183,0)',
					],
					borderWidth: 1
				}]
			},
			options: {
				plugins: {
					title: {
						display: true,
						text: 'Разпределение на казуси',
						padding: {
							top: 20,
							bottom: 10
						}
					}
				}

			}
		});
	}
}
