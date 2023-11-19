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
        type: 'polarArea',
        data: {
          labels: medicationNames,
          datasets: [{
            label: 'Frequência de Uso dos Medicamentos',
            data: frequencies,
            backgroundColor: backgroundColors,
            borderWidth: 1 // Pode ajustar ou remover conforme necessário
          }]
        },
        options: {
          scales: {
            r: {
              angleLines: {
                display: false
              },
              suggestedMin: 0 // Isso assegura que o gráfico comece do zero
            }
          },
          // Outras opções de customização podem ser adicionadas aqui
        }
      });
    } else {
      console.error('Não foi possível obter o contexto do canvas');
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
}
