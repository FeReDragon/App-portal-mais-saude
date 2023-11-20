import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserHealthDataService } from '../../../services/user-health-data.service';
import { Exercise } from '../../../interfaces/IHealt';

@Component({
  selector: 'app-exercise-log-chart',
  templateUrl: './exercise-log-chart.component.html',
  styleUrls: ['./exercise-log-chart.component.scss']
})
export class ExerciseLogChartComponent implements OnInit {
  exercisesData: Exercise[] = [];
  dailyCaloriesBurned: { [date: string]: number } = {};

  constructor(
    private userHealthDataService: UserHealthDataService,
    private authenticationService: AuthenticationService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.userHealthDataService.getExercisesForUser().subscribe(data => {
        this.exercisesData = data;
        this.aggregateCaloriesBurned();
        this.initializeChart();
      });
    }
  }

  aggregateCaloriesBurned() {
    this.exercisesData.forEach(exercise => {
      const date = new Date(exercise.timestamp).toISOString().split('T')[0]; // Obtém a data no formato 'YYYY-MM-DD'
      this.dailyCaloriesBurned[date] = (this.dailyCaloriesBurned[date] || 0) + exercise.caloriesBurned;
    });
  }

  initializeChart() {
    const dates = Object.keys(this.dailyCaloriesBurned).sort();
    const calories = dates.map(date => this.dailyCaloriesBurned[date]);

    const canvas = <HTMLCanvasElement>document.getElementById('exerciseChart');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: 'Calorias Queimadas por Dia',
            data: calories,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
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
