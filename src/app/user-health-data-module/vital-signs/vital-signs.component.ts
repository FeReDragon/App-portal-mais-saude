import { Component, OnInit } from '@angular/core';
import { VitalSigns } from '../../interfaces/IHealt';

import { AuthenticationService } from '../../services/authentication.service';
import { UserHealthDataService } from '../../services/user-health-data.service';

@Component({
  selector: 'app-vital-signs',
  templateUrl: './vital-signs.component.html',
  styleUrls: ['./vital-signs.component.scss']
})
export class VitalSignsComponent implements OnInit {
  vitalSigns: VitalSigns[] = [];
  bloodPressure: number = 0; // Valor inicial padrão
  heartRate: number = 0; // Valor inicial padrão
  bodyTemperature: number = 0; // Valor inicial padrão
  bloodGlucose: number = 0; // Valor inicial padrão

  constructor(
    private userHealthDataService: UserHealthDataService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getVitalSigns();
  }

  getVitalSigns(): void {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
        this.userHealthDataService.getVitalSignsForUser(currentUser.id).subscribe((vitalSigns: VitalSigns[]) => {
            if (vitalSigns && vitalSigns.length > 0) {
                this.vitalSigns = vitalSigns;
            } else {
                console.log('No vital signs data returned for user id', currentUser.id);
            }
        }, error => {
            console.error('Error fetching vital signs for user id', currentUser.id, error);
        });
    }
  }

  register(): void {
    this.userHealthDataService.registerVitalSigns(
      this.bloodPressure,
      this.heartRate,
      this.bodyTemperature,
      this.bloodGlucose
    );
  }
}
