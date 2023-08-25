import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from 'src/app/auth/auth.service';
import { ICase } from 'src/app/interfaces/case';
import { IUser } from 'src/app/interfaces/user';
Chart.register(...registerables);


@Component({
	selector: 'app-chart-users',
	templateUrl: './chart-users.component.html',
	styleUrls: ['./chart-users.component.scss']
})
export class ChartUsersComponent {
	users: IUser[] = [];
	occupiedUsers: number = 0;

	private chartInstance: any

	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.loadUsersAndOccupiedUsers();
	}

	/*
		createChart() {
			if (!this.users) {
				return; // Wait until users data is available
			}
			const freeUsers = this.users.length - this.occupiedUsers;
			let myChart = new Chart("userChart", {
				type: 'pie',
				data: {
					labels: ['Незаети с закус', 'Заети с казус'],
					datasets: [{
						label: 'Брой студенти',
						data: [freeUsers, this.occupiedUsers],
						backgroundColor: ["#e14b31", "#1984c5"],
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
							text: 'Заетост на студенти',
							padding: {
								top: 20,
								bottom: 10
							}
						}
					}
	
				}
			});
		}
	*/

	createChart() {
		const freeUsers = this.users.length - this.occupiedUsers;
		const chartData = {
			labels: ['Незаети с закус', 'Заети с казус'],
			datasets: [{
				label: 'Брой студенти',
				data: [freeUsers, this.occupiedUsers],
				backgroundColor: ["#e14b31", "#1984c5"],
				borderColor: [
					'rgba(103,58,183,0)',
				],
				borderWidth: 1
			}]
		};

		const chartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				title: {
					display: true,
					text: 'Заетост на студенти',
					padding: {
						top: 20,
						bottom: 10
					}
				}
			}
		};

		this.chartInstance = new Chart('userChart', {
			type: 'pie',
			data: chartData,
			options: chartOptions
		});
	}

	updateChart() {
		if (this.chartInstance) {
			const freeUsers = this.users.length - this.occupiedUsers;
			this.chartInstance.data.datasets[0].data = [freeUsers, this.occupiedUsers];
			this.chartInstance.update();
		} else {
			this.createChart();
		}
	}

	loadUsersAndOccupiedUsers() {
		this.authService.getAllUsers().subscribe((response: any) => {
			this.users = response.result;

			this.authService.getOccupiedUsers().subscribe((response: any) => {
				this.occupiedUsers = response.result;
				this.updateChart();

			});
		});
	}
}