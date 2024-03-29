import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserHealthDataService } from '../../../services/user-health-data.service';
import { Medication } from '../../../interfaces/IHealt';

@Component({
  selector: 'app-medication-log-chart',
  templateUrl: './medication-log-chart.component.html',
  styleUrls: ['./medication-log-chart.component.scss']
})
export class MedicationLogChartComponent implements OnInit {
  medicationsData: Medication[] = [];
  medicationFrequencies: { [name: string]: number } = {};

  constructor(
    private userHealthDataService: UserHealthDataService,
    private authenticationService: AuthenticationService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.userHealthDataService.getMedicationsForUser().subscribe(data => {
        this.medicationsData = data;
        this.calculateMedicationFrequencies();
        this.initializeChart();
      });
    }
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  calculateMedicationFrequencies() {
    this.medicationsData.forEach(medication => {
      if (this.medicationFrequencies[medication.name]) {
        this.medicationFrequencies[medication.name]++;
      } else {
        this.medicationFrequencies[medication.name] = 1;
      }
    });
  }

  initializeChart() {
    const medicationNames = Object.keys(this.medicationFrequencies);
    const frequencies = Object.values(this.medicationFrequencies);
    const backgroundColors = medicationNames.map(() => this.getRandomColor());

    const canvas = <HTMLCanvasElement>document.getElementById('medicationChart');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: medicationNames,
          datasets: [{
            label: 'Frequência de Uso dos Medicamentos',
            data: frequencies,
            backgroundColor: backgroundColors,
            borderWidth: 0
          }]
        },
        options: {
          plugins: {
            legend: {
              position: 'top',
              align: 'start',
              fullSize: true,
              labels: {
                boxWidth: 10,
                boxHeight: 10,
                padding: 10,
                font: {
                  size: 12
                },
                usePointStyle: true,
                pointStyle: 'rectRounded'
              }
            }
          }
          // Outras opções de customização podem ser adicionadas aqui
        }
      });
    } else {
      console.error('Não foi possível obter o contexto do canvas');
    }
  }
}
