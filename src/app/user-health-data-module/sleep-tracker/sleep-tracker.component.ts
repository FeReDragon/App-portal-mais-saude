import { Component, OnInit } from '@angular/core';
import { UserHealthDataService } from '../../services/user-health-data.service';
import { AuthenticationService } from '../../services/authentication.service';
import { SleepTrackerEntry } from '../../interfaces/IHealt';

@Component({
  selector: 'app-sleep-tracker',
  templateUrl: './sleep-tracker.component.html',
  styleUrls: ['./sleep-tracker.component.scss']
})
export class SleepTrackerComponent implements OnInit {
  public hoursSlept?: number;  // Alterado aqui para ser opcional
  public sleepQuality: string = '';
  public sleepEvents: string = '';
  public sleepTrackerEntries: SleepTrackerEntry[] = [];

  constructor(
    private userHealthDataService: UserHealthDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.userHealthDataService.getSleepTrackerEntriesForUser(currentUser.id).subscribe((entries: SleepTrackerEntry[]) => {
        this.sleepTrackerEntries = entries;
      }, (error: any) => {
        console.log(error);
      });
    }
  }

  registerSleepTrackerEntry() {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      const newEntry: SleepTrackerEntry = {
        userId: currentUser.id,
        hoursSlept: this.hoursSlept || 0,  // Alterado aqui para usar 0 se hoursSlept for undefined
        sleepQuality: this.sleepQuality,
        sleepEvents: this.sleepEvents,
        timestamp: new Date()
      };
      this.userHealthDataService.registerSleepTrackerEntry(newEntry).subscribe(() => {
        this.sleepTrackerEntries.push(newEntry);
        this.hoursSlept = undefined;  // Alterado aqui para limpar o campo
        this.sleepQuality = '';
        this.sleepEvents = '';
      }, (error: any) => {
        console.log(error);
      });
    }
  }
}

