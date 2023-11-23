// vital-signs-chart.component.ts
import { Component, OnInit } from '@angular/core';
import { UserHealthDataService } from '../../../services/user-health-data.service';
import { VitalSigns } from '../../../interfaces/IHealt';
import { Chart, registerables } from 'chart.js';
import { AuthenticationService } from 'src/app/services/authentication.service';
Chart.register(...registerables);


@Component({
  selector: 'app-vital-signs-chart',
  templateUrl: './vital-signs-chart.component.html',
  styleUrls: ['./vital-signs-chart.component.scss']
})
export class VitalSignsChartComponent implements OnInit {
  
  vitalSignsData: VitalSigns[] = [];
  bloodPressureSystolicData: number[] = [];
  bloodPressureDiastolicData: number[] = [];
  heartRateData: number[] = [];
  bodyTemperatureData: number[] = [];
  bloodGlucoseData: number[] = [];
  timestamps: string[] = [];

  constructor(
    private userHealthDataService: UserHealthDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.userHealthDataService.getVitalSignsForUser().subscribe(data => {
        this.vitalSignsData = data;
        this.processData();
        this.initializeChart();
      }, error => {
        console.error('Error fetching vital signs for user id', currentUser.id, error);
      });
    } else {
      console.error('No current user or user id is unavailable');
    }
  }

  processData() {
    this.vitalSignsData.forEach(vitalSign => {
      const { systolic, diastolic } = this.splitBloodPressure(vitalSign.bloodPressure);
      this.bloodPressureSystolicData.push(systolic);
      this.bloodPressureDiastolicData.push(diastolic);
      this.heartRateData.push(vitalSign.heartRate);
      this.bodyTemperatureData.push(vitalSign.bodyTemperature);
      this.bloodGlucoseData.push(vitalSign.bloodGlucose);
      this.timestamps.push(this.formatDate(vitalSign.timestamp));
    });
  }

  splitBloodPressure(bloodPressure: string): { systolic: number; diastolic: number } {
    const parts = bloodPressure.split('/');
    return {
        systolic: parseInt(parts[0], 10),
        diastolic: parseInt(parts[1], 10)
    };
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString(); // Retorna a data formatada
  }
  

  initializeChart() {
    const canvas = <HTMLCanvasElement>document.getElementById('vitalSignsChart');
    const ctx = canvas.getContext('2d');

    if (ctx) {
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.timestamps,
                datasets: [{
                    label: 'Pressão Sistólica',
                    data: this.bloodPressureSystolicData,
                    borderColor: '#FF6384',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    pointBackgroundColor: '#FF6384',
                    borderWidth: 2,
                    tension: 0.4
                }, {
                    label: 'Pressão Diastólica',
                    data: this.bloodPressureDiastolicData,
                    borderColor: '#36A2EB',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    pointBackgroundColor: '#36A2EB',
                    borderWidth: 2,
                    tension: 0.4
                }, {
                    label: 'Frequência Cardíaca',
                    data: this.heartRateData,
                    borderColor: '#4BC0C0',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    pointBackgroundColor: '#4BC0C0',
                    borderWidth: 2,
                    tension: 0.4
                }, {
                    label: 'Temperatura Corporal',
                    data: this.bodyTemperatureData,
                    borderColor: '#FFCE56',
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    pointBackgroundColor: '#FFCE56',
                    borderWidth: 2,
                    tension: 0.4
                }, {
                    label: 'Glicose no Sangue',
                    data: this.bloodGlucoseData,
                    borderColor: '#9966FF',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    pointBackgroundColor: '#9966FF',
                    borderWidth: 2,
                    tension: 0.4
                }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true, // Tente mudar para true
              aspectRatio: 1, // Pode ajustar conforme necessário
              scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'lightgrey',
                        },
                        ticks: {
                            color: 'grey',
                        }
                    },
                    x: {
                        ticks: {
                            color: 'grey',
                        }
                    }
                },
                plugins: {
                  legend: {
                    position: 'top',
                    align: 'start', // Alinha os itens da legenda à esquerda
                    fullSize: true, // Impede que a legenda ocupe todo o topo do gráfico
                    labels: {
                      boxWidth: 10, // Largura do retângulo da legenda
                      boxHeight: 10, // Altura do retângulo da legenda
                      padding: 10, // Espaçamento entre os itens da legenda
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
                }
            }

            
        });
    } else {
        console.error('Não foi possível obter o contexto do canvas');
    }
  }
}
