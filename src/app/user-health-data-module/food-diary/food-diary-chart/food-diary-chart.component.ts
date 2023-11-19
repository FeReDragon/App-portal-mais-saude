import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserHealthDataService } from '../../../services/user-health-data.service';
import { FoodDiaryEntry } from '../../../interfaces/IHealt';

@Component({
  selector: 'app-food-diary-chart',
  templateUrl: './food-diary-chart.component.html',
  styleUrls: ['./food-diary-chart.component.scss']
})
export class FoodDiaryChartComponent implements OnInit {
  foodDiaryEntries: FoodDiaryEntry[] = [];
  dailyCalories: { [date: string]: number } = {};

  constructor(
    private userHealthDataService: UserHealthDataService,
    private authenticationService: AuthenticationService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.userHealthDataService.getFoodDiaryEntriesForUser(currentUser.id).subscribe(data => {
        this.foodDiaryEntries = data;
        this.aggregateCalories();
        this.initializeChart();
      });
    }
  }

  aggregateCalories() {
    this.foodDiaryEntries.forEach(entry => {
      const entryDate = new Date(entry.timestamp);
      const date = entryDate.toISOString().split('T')[0]; // Obtém a data no formato 'YYYY-MM-DD'
  
      this.dailyCalories[date] = (this.dailyCalories[date] || 0) + entry.calories;
    });
  }
  

  initializeChart() {
    const dates = Object.keys(this.dailyCalories).sort();
    const calories = dates.map(date => this.dailyCalories[date]);

    const canvas = <HTMLCanvasElement>document.getElementById('foodDiaryChart');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: 'Calorias Consumidas por Dia',
            data: calories,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
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

