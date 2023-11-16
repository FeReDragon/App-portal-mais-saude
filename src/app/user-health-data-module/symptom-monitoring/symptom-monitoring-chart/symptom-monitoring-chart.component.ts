import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserHealthDataService } from '../../../services/user-health-data.service';
import { Symptom } from '../../../interfaces/IHealt';

@Component({
  selector: 'app-symptom-monitoring-chart',
  templateUrl: './symptom-monitoring-chart.component.html',
  styleUrls: ['./symptom-monitoring-chart.component.scss']
})
export class SymptomMonitoringChartComponent implements OnInit {
  symptomsData: Symptom[] = [];

  constructor(
    private userHealthDataService: UserHealthDataService,
    private authenticationService: AuthenticationService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.userHealthDataService.getSymptomsForUser(currentUser.id).subscribe(data => {
        this.symptomsData = data;
        this.initializeChart();
      });
    }
  }

  initializeChart() {
    const labels = this.symptomsData.map(symptom => symptom.symptomName);
    const intensities = this.symptomsData.map(symptom => symptom.intensity ?? 0);

    const canvas = <HTMLCanvasElement>document.getElementById('symptomsChart');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Intensidade dos Sintomas',
            data: intensities,
            backgroundColor: 'rgba(0, 123, 255, 0.5)'
          }]
        },
        options: {
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    } else {
      console.error('Não foi possível obter o contexto do canvas');
    }
  }
}

