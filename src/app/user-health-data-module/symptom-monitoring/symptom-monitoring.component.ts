import { Component, OnInit, Input } from '@angular/core';
import { Symptom } from '../../interfaces/IHealt';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { UserHealthDataService } from '../../services/user-health-data.service';

@Component({
  selector: 'app-symptom-monitoring',
  templateUrl: './symptom-monitoring.component.html',
  styleUrls: ['./symptom-monitoring.component.scss']
})
export class SymptomMonitoringComponent implements OnInit {
  symptoms: Symptom[] = [];
  symptomName: string = '';
  intensity: number | null = null;
  frequency: string = '';
  duration: string = '';
  notes: string = ''; 
  @Input() isSummaryView: boolean = false;

  constructor(
    private userHealthDataService: UserHealthDataService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getSymptoms();
  }

  getSymptoms(): void {
    this.userHealthDataService.getSymptomsForUser().subscribe(
      (symptoms: Symptom[]) => {
        if (symptoms && symptoms.length > 0) {
          this.symptoms = symptoms;
        } else {
          console.log('No symptoms data returned for the current user');
        }
      }, error => {
        console.error('Error fetching symptoms for the current user', error);
      }
    );
  }
  
  checkIfSummaryView(): void {
    if (this.router.url.includes('summary')) {
      this.isSummaryView = true;
    }
  }

  register(): void {
    console.log('Valor de symptom:', this.symptomName);
    console.log('Valor de intensity:', this.intensity);
    console.log('Valor de frequency:', this.frequency);
    console.log('Valor de duration:', this.duration);
    console.log('Valor de notes:', this.notes);

    const newSymptom: Symptom = {
      userId: 0, 
      symptomName: this.symptomName,
      intensity: this.intensity !== null ? this.intensity : 0,
      frequency: this.frequency,
      duration: this.duration,
      notes: this.notes,
      timestamp: new Date()
    };
    

    console.log('New Symptom object:', newSymptom); 

    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      newSymptom.userId = currentUser.id;
      this.userHealthDataService.registerSymptom(newSymptom).subscribe(() => {
        // Atualizar a lista de sintomas após o registro ser concluído com sucesso
        this.getSymptoms();
        // Limpar os valores dos inputs após o registro
        this.resetForm();
      }, error => {
        console.error('Error registering symptom:', error);
      });
    }
  }

  intensityToText(value: number): string {
    switch (value) {
      case 0:
        return 'Muito Leve';
      case 1:
        return 'Leve';
      case 2:
        return 'Moderada';
      case 3:
        return 'Forte';
      case 4:
        return 'Muito Forte';
      default:
        return ''; 
    }
  }
  

  resetForm(): void {
    this.symptomName = '';
    this.intensity = null;
    this.frequency = '';
    this.duration = '';
    this.notes = '';
  }
}

