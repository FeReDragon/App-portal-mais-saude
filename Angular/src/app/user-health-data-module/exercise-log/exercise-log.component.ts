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
  public intensity?: number;  // Alterado aqui para ser opcional
  public caloriesBurned?: number;  // Alterado aqui para ser opcional
  public timestamp: string = '';
  public exercises: Exercise[] = [];
  @Input() isSummaryView: boolean = false; 

  constructor(
    private userHealthDataService: UserHealthDataService,
    private authenticationService: AuthenticationService,
     private router: Router,
  ) {}

  ngOnInit() {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.userHealthDataService.getExercisesForUser(currentUser.id).subscribe((exercises: Exercise[]) => {
        this.exercises = exercises;
      }, (error: any) => {
        console.log(error);
      });
    }
  }

  checkIfSummaryView(): void {
    if (this.router.url.includes('summary')) {
      this.isSummaryView = true;
    }
  }

  registerExercise() {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      const newExercise: Exercise = {
        userId: currentUser.id,
        exerciseType: this.exerciseType,
        duration: this.duration,
        intensity: this.intensity || 0,  // Alterado aqui para usar 0 se intensity for undefined
        caloriesBurned: this.caloriesBurned || 0,  // Alterado aqui para usar 0 se caloriesBurned for undefined
        timestamp: new Date()
      };
      this.userHealthDataService.registerExercise(newExercise).subscribe(() => {
        this.exercises.push(newExercise);
        this.exerciseType = '';
        this.duration = '';
        this.intensity = undefined;  // Alterado aqui para limpar o campo
        this.caloriesBurned = undefined;  // Alterado aqui para limpar o campo
        this.timestamp = '';
      }, (error: any) => {
        console.log(error);
      });
    }
  }
}

