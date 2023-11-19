import { Component, OnInit, Input } from '@angular/core';
import { UserHealthDataService } from '../../services/user-health-data.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Medication } from '../../interfaces/IHealt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medication-log',
  templateUrl: './medication-log.component.html',
  styleUrls: ['./medication-log.component.scss']
})
export class MedicationLogComponent implements OnInit {
  public medicationName: string = '';
  public dosage: string = '';
  public time: string = '';
  public medications: Medication[] = [];
  @Input() isSummaryView: boolean = false;

  constructor(
    private userHealthDataService: UserHealthDataService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.checkIfSummaryView();
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.userHealthDataService.getMedicationsForUser().subscribe((medications: Medication[]) => {
        this.medications = medications;
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

  registerMedication() {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      const newMedication: Medication = {
        userId: currentUser.id,
        name: this.medicationName,
        dose: Number(this.dosage),
        frequency: this.time,
        timestamp: new Date() 
      };
      this.userHealthDataService.registerMedication(newMedication).subscribe(() => {
        this.medications.push(newMedication);
        this.medicationName = '';
        this.dosage = '';
        this.time = '';
      }, (error: any) => {
        console.log(error);
      });
    }
  }
}
