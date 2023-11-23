import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserHealthDataService } from '../../../services/user-health-data.service';
import { SleepTrackerEntry } from '../../../interfaces/IHealt';

@Component({
  selector: 'app-sleep-tracker-chart',
  templateUrl: './sleep-tracker-chart.component.html',
  styleUrls: ['./sleep-tracker-chart.component.scss']
})
export class SleepTrackerChartComponent implements OnInit {
  sleepTrackerEntries: SleepTrackerEntry[] = [];
  sleepDataByDate: { [date: string]: number } = {}; // Agora armazenando apenas as horas

  constructor(
    private userHealthDataService: UserHealthDataService,
    private authenticationService: AuthenticationService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.userHealthDataService.getSleepTrackerEntriesForUser().subscribe(data => {
        this.sleepTrackerEntries = data;
        this.aggregateSleepData();
        this.initializeChart();
      });
    }
  }

  aggregateSleepData() {
    this.sleepTrackerEntries.forEach(entry => {
      const date = new Date(entry.timestamp).toISOString().split('T')[0];
      this.sleepDataByDate[date] = (this.sleepDataByDate[date] || 0) + entry.hoursSlept;
    });
  }

  initializeChart() {
    const dates = Object.keys(this.sleepDataByDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const hoursSlept = dates.map(date => this.sleepDataByDate[date]);

    const canvas = <HTMLCanvasElement>document.getElementById('sleepTrackerChart');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dates,
          datasets: [{
            label: 'Horas Dormidas',
            data: hoursSlept,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Não foi possível obter o contexto do canvas');
    }
  }
}


