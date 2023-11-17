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
  symptomFrequencies: { [symptomName: string]: number } = {};

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
        this.calculateSymptomFrequencies();
        this.initializeChart();
      });
    }
  }

  calculateSymptomFrequencies() {
    this.symptomsData.forEach(symptom => {
      if (this.symptomFrequencies[symptom.symptomName]) {
        this.symptomFrequencies[symptom.symptomName]++;
      } else {
        this.symptomFrequencies[symptom.symptomName] = 1;
      }
    });
  }

  initializeChart() {
    const symptomNames = Object.keys(this.symptomFrequencies);
    const frequencies = Object.values(this.symptomFrequencies);
  
    // Gera uma cor aleatória para cada sintoma
    const backgroundColors = symptomNames.map(() => this.getRandomColor());
  
    const canvas = <HTMLCanvasElement>document.getElementById('symptomsChart');
    const ctx = canvas.getContext('2d');
  
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut', // Ou 'pie' se preferir um gráfico de pizza
        data: {
          labels: symptomNames,
          datasets: [{
            label: 'Frequência dos Sintomas',
            data: frequencies,
            backgroundColor: backgroundColors
          }]
        },
        options: {
          // Opções adicionais, se necessário
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

