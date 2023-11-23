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
      this.userHealthDataService.getSymptomsForUser().subscribe(data => {
        this.symptomsData = data;
        this.calculateSymptomFrequencies();
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
    const backgroundColors = symptomNames.map(() => this.getRandomColor());

    const canvas = <HTMLCanvasElement>document.getElementById('symptomsChart');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: symptomNames,
          datasets: [{
            label: 'Frequência dos Sintomas',
            data: frequencies,
            backgroundColor: backgroundColors,
            borderWidth: 0,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true, // Tente mudar para true
          aspectRatio: 1, // Pode ajustar conforme necessário
          scales: {
            r: {
              angleLines: {
                display: false
              },
              suggestedMin: 0,
              ticks: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              position: 'top',
              align: 'start', // Alinha os itens da legenda à esquerda
              fullSize: true, // Impede que a legenda ocupe todo o topo do gráfico
              labels: {
                boxWidth: 10,
                boxHeight: 10,
                padding: 10,
                font: {
                  size: 12
                },
                usePointStyle: true, // Usa o estilo do ponto para a legenda
                pointStyle: 'rectRounded' // Faz com que os itens da legenda sejam retângulos arredondados
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(255,255,255,0.8)',
              titleColor: '#000',
              bodyColor: '#000',
              borderColor: '#ddd',
              borderWidth: 1
            }
          },
          animation: {
            animateRotate: true,
            animateScale: true
          }
        }
      });
    } else {
      console.error('Não foi possível obter o contexto do canvas');
    }
  }
}
