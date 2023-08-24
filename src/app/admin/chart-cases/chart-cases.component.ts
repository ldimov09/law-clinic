import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ICase } from 'src/app/interfaces/case';
Chart.register(...registerables);

@Component({
	selector: 'app-chart-cases',
	templateUrl: './chart-cases.component.html',
	styleUrls: ['./chart-cases.component.scss']
})
export class ChartCasesComponent {

	@Input() data!: number[];

	ngOnInit() {
		let myChart = new Chart("myChart", {
			type: 'pie',
			data: {
				labels: ['Неодобрени', 'Одобрени', 'Работи се', 'Завършени', 'Отхвърлени'],
				datasets: [{
					label: 'Брой казуси',
					data: this.data,
					backgroundColor: ["#1984c5", "#a7d5ed", "#e2e2e2", "#de6e56", "#e14b31"],
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
