import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UserHealthDataService } from '../../services/user-health-data.service';
import { SleepTrackerEntry, SleepQuality } from '../../interfaces/IHealt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sleep-tracker',
  templateUrl: './sleep-tracker.component.html',
  styleUrls: ['./sleep-tracker.component.scss']
})
export class SleepTrackerComponent implements OnInit {
  hoursSlept: number | null = null;
  sleepQuality: SleepQuality | null = null;
  sleepEvents: string = '';
  sleepTrackerEntries: SleepTrackerEntry[] = [];
  @Input() isSummaryView: boolean = false;

  constructor(
    private userHealthDataService: UserHealthDataService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getSleepTrackerEntries();
  }

  getSleepTrackerEntries(): void {
    this.userHealthDataService.getSleepTrackerEntriesForUser().subscribe({
      next: (entries: SleepTrackerEntry[]) => {
        this.sleepTrackerEntries = entries;
      },
      error: (error) => {
        console.error('Error fetching sleep tracker entries:', error);
      }
    });
  }

  register(): void {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser?.id && this.hoursSlept && this.sleepQuality !== null) {
      const newSleepTrackerEntry: SleepTrackerEntry = {
        userId: currentUser.id, // Certifique-se de que userId está sendo passado
        hoursSlept: this.hoursSlept,
        sleepQuality: this.sleepQuality,
        sleepEvents: this.sleepEvents,
        timestamp: new Date()
      };
      
      this.userHealthDataService.registerSleepTrackerEntry(newSleepTrackerEntry).subscribe({
        next: (response) => {
          console.log('Sleep Tracker Entry saved:', response);
          this.resetForm();
          this.getSleepTrackerEntries(); // Refresh list
        },
        error: (error) => {
          console.error('Error saving sleep tracker entry:', error);
        }
      });
    } else {
      console.error('Hours slept and sleep quality must be set.');
    }
  }

  sleepQualityToText(value: SleepQuality): string {
    // Correção: Garantir que todas as ramificações da função retornem um valor
    switch (value) {
      case SleepQuality.Excellent:
        return 'Excelente';
      case SleepQuality.Good:
        return 'Boa';
      case SleepQuality.Average:
        return 'Razoável';
      case SleepQuality.Poor:
        return 'Ruim';
      case SleepQuality.VeryPoor:
        return 'Péssima';
      default:
        return 'Indefinido';
    }
  }

  resetForm(): void {
    // Correção: Função corrigida para não retornar um valor, pois seu tipo de retorno é void
    this.hoursSlept = null;
    this.sleepQuality = null;
    this.sleepEvents = '';
  }
}
