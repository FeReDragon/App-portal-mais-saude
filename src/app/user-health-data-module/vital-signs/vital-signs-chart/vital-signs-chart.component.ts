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
    // Primeiro, obtemos o elemento canvas do DOM
    const canvas = <HTMLCanvasElement>document.getElementById('vitalSignsChart');
    // Em seguida, obtemos o contexto de renderização 2D do canvas
    const ctx = canvas.getContext('2d');

    // Verificamos se o contexto não é null
    if (ctx) {
        // Se o contexto é válido, inicializamos o gráfico
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.timestamps,
                datasets: [{
                    label: 'Pressão Sistólica',
                    data: this.bloodPressureSystolicData,
                    borderColor: 'red',
                    // Outras configurações específicas do dataset
                }, {
                    label: 'Pressão Diastólica',
                    data: this.bloodPressureDiastolicData,
                    borderColor: 'blue',
                    // Outras configurações específicas do dataset
                }, {
                    label: 'Frequência Cardíaca',
                    data: this.heartRateData,
                    borderColor: 'green',
                    // Outras configurações específicas do dataset
                }, {
                    label: 'Temperatura Corporal',
                    data: this.bodyTemperatureData,
                    borderColor: 'orange',
                    // Outras configurações específicas do dataset
                }, {
                    label: 'Glicose no Sangue',
                    data: this.bloodGlucoseData,
                    borderColor: 'purple',
                    // Outras configurações específicas do dataset
                }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true, // Tente mudar para true
              aspectRatio: 1, // Pode ajustar conforme necessário
              scales: {
                    y: {
                        beginAtZero: true // Isto é opcional, dependendo dos seus dados
                    }
                },
                // Outras opções de configuração do gráfico
            }
        });
    } else {
        console.error('Não foi possível obter o contexto do canvas');
    }
  }
}
