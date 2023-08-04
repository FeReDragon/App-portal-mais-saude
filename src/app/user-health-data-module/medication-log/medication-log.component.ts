import { Component, OnInit } from '@angular/core';
import { UserHealthDataService } from '../../services/user-health-data.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Medication } from '../../interfaces/IHealt';

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

  constructor(
    private userHealthDataService: UserHealthDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.userHealthDataService.getMedicationsForUser(currentUser.id).subscribe((medications: Medication[]) => {
        this.medications = medications;
      }, (error: any) => {
        console.log(error);
      });
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
        timestamp: new Date() 
      }, (error: any) => {
        console.log(error);
      });
    }
  }
}
