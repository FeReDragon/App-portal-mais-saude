import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { forkJoin } from 'rxjs';
import { PdfService } from '../../services/pdf.service';
import { UserHealthDataService } from '../../services/user-health-data.service';
import { AuthenticationService, User } from '../../services/authentication.service';
import { VitalSigns, Symptom, Medication, Exercise, FoodDiaryEntry, SleepTrackerEntry, Vaccination } from '../../interfaces/IHealt';

@Component({
  selector: 'app-printable-reports',
  templateUrl: './printable-reports.component.html',
  styleUrls: ['./printable-reports.component.scss']
})
export class PrintableReportsComponent implements OnDestroy {
  @ViewChild('reportContent') reportContent!: ElementRef;

  vitalSigns: VitalSigns[] = [];
  symptoms: Symptom[] = [];
  medications: Medication[] = [];
  exercises: Exercise[] = [];
  foodDiaryEntries: FoodDiaryEntry[] = [];
  sleepTrackerEntries: SleepTrackerEntry[] = [];
  vaccinationSchedules: Vaccination[] = [];
  currentUser: User | null = null;
  dataLoaded: boolean = false; // Control flag for data loading
  subscriptions: Subscription[] = []; // Array to store all subscriptions

  constructor(
    private pdfService: PdfService,
    private healthDataService: UserHealthDataService,
    private authService: AuthenticationService
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    if (this.currentUser && this.currentUser.id) {
      const userId = this.currentUser.id;
      const vitalSigns$ = this.healthDataService.getVitalSignsForUser(userId);
      const symptoms$ = this.healthDataService.getSymptomsForUser(userId);
      // ... other data fetch calls
  
      const subscription = forkJoin({
        vitalSigns: vitalSigns$,
        symptoms: symptoms$,
        // ... other observables
      }).subscribe(results => {
        this.vitalSigns = results.vitalSigns;
        this.symptoms = results.symptoms;
        // ... handle other results
        this.dataLoaded = true; // Set to true when all data is loaded
      }, error => {
        console.error('Failed to load user data:', error);
      });
  
      this.subscriptions.push(subscription);
    } else {
      console.error('No user logged in.');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  generatePdf(): void {
    if (this.dataLoaded && this.reportContent) {
      this.pdfService.generatePdfFromElement(this.reportContent.nativeElement, 'Relatório de Saúde');
    } else {
      console.error('Não foi possível gerar o PDF: dados ainda não foram carregados ou o elemento do conteúdo do relatório não está disponível');
    }
  }
}
