import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VitalSigns } from '../../interfaces/IHealt';
import { AuthenticationService } from '../../services/authentication.service';
import { UserHealthDataService } from '../../services/user-health-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vital-signs',
  templateUrl: './vital-signs.component.html',
  styleUrls: ['./vital-signs.component.scss']
})
export class VitalSignsComponent implements OnInit {
  vitalSigns: VitalSigns[] = [];
  vitalSignsForm: FormGroup;
  @Input() isSummaryView: boolean = false; // Por padrão, definido como falso

  constructor(
    private userHealthDataService: UserHealthDataService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.vitalSignsForm = this.formBuilder.group({
      bloodPressure: ['', [Validators.required, Validators.pattern(/^\d{2,3}\/\d{2,3}$/)]],
      heartRate: [null, [Validators.required, Validators.min(40), Validators.max(200)]],
      bodyTemperature: [null, [Validators.required, Validators.min(20), Validators.max(45)]],
      bloodGlucose: [null, [Validators.required, Validators.min(20), Validators.max(800)]]
    });
  }

  ngOnInit(): void {
    this.checkIfSummaryView();
    this.getVitalSigns();
  }

  checkIfSummaryView(): void {
    if (this.router.url.includes('summary')) {
      this.isSummaryView = true;
    }
  }

  getVitalSigns(): void {
    this.userHealthDataService.getVitalSignsForUser().subscribe(
      (vitalSigns: VitalSigns[]) => {
        if (vitalSigns && vitalSigns.length > 0) {
          this.vitalSigns = vitalSigns;
        } else {
          console.log('No vital signs data returned for the current user');
        }
      }, error => {
        console.error('Error fetching vital signs for the current user', error);
      }
    );
  }

  register(): void {
    const atLeastOneFieldValid = (
      (this.vitalSignsForm.get('heartRate')?.valid && this.vitalSignsForm.value.heartRate !== null) ||
      (this.vitalSignsForm.get('bodyTemperature')?.valid && this.vitalSignsForm.value.bodyTemperature !== null) ||
      (this.vitalSignsForm.get('bloodGlucose')?.valid && this.vitalSignsForm.value.bloodGlucose !== null) ||
      (this.vitalSignsForm.get('bloodPressure')?.valid && this.vitalSignsForm.value.bloodPressure !== '')
    );

    if (atLeastOneFieldValid) {
      const currentUser = this.authenticationService.getCurrentUser();
      if (currentUser && currentUser.id) {
        const newVitalSigns: VitalSigns = {
          userId: currentUser.id,
          bloodPressure: this.vitalSignsForm.value.bloodPressure,
          heartRate: this.vitalSignsForm.value.heartRate,
          bodyTemperature: this.vitalSignsForm.value.bodyTemperature,
          bloodGlucose: this.vitalSignsForm.value.bloodGlucose,
          timestamp: new Date()
        };

        this.userHealthDataService.registerVitalSigns(newVitalSigns).subscribe(() => {
          this.getVitalSigns();
          this.resetForm();
        }, error => {
          console.error('Error registering vital signs', error);
        });
      }
    }
  }

  resetForm(): void {
    this.vitalSignsForm.reset();
  }
}


