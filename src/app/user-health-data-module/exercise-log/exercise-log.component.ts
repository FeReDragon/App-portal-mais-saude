import { Component, OnInit, Input } from '@angular/core';
import { UserHealthDataService } from '../../services/user-health-data.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Exercise } from '../../interfaces/IHealt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise-log',
  templateUrl: './exercise-log.component.html',
  styleUrls: ['./exercise-log.component.scss']
})
export class ExerciseLogComponent implements OnInit {
  public exerciseType: string = '';
  public duration: string = '';
  public intensity: number | null = null;
  public caloriesBurned?: number;
  public exercises: Exercise[] = [];
  @Input() isSummaryView: boolean = false;

  constructor(
    private userHealthDataService: UserHealthDataService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadExercises();
  }

  loadExercises(): void {
    this.userHealthDataService.getExercisesForUser().subscribe({
      next: (exercises: Exercise[]) => {
        this.exercises = exercises;
      },
      error: (error) => {
        console.error('Error fetching exercises:', error);
      },
    });
  }

  registerExercise(): void {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      const newExercise: Exercise = {
        userId: currentUser.id,
        exerciseType: this.exerciseType,
        duration: this.duration,
        intensity: this.intensity || 0,
        caloriesBurned: this.caloriesBurned || 0,
        timestamp: new Date(),
      };

      this.userHealthDataService.registerExercise(newExercise).subscribe({
        next: () => {
          // Após o registro, recarregue a lista de exercícios para obter os dados atualizados
          this.loadExercises();
        },
        error: (error) => {
          console.error('Error registering exercise:', error);
        },
      });

      // Limpar o formulário após o registro
      this.resetForm();
    }
  }

  intensityToText(value: number): string {
    switch (value) {
      case 0: return 'Leve';
      case 1: return 'Moderada';
      case 2: return 'Intensa';
      default: return '';
    }
  }

  resetForm(): void {
    this.exerciseType = '';
    this.duration = '';
    this.intensity = null;
    this.caloriesBurned = undefined;
  }
}
