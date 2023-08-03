import { Component, OnInit } from '@angular/core';
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
  bloodPressure: number | null = null; // Valor inicial null
  heartRate: number | null = null; // Valor inicial null
  bodyTemperature: number | null = null; // Valor inicial null
  bloodGlucose: number | null = null; // Valor inicial null


  constructor(
    private userHealthDataService: UserHealthDataService,
    private authenticationService: AuthenticationService,
    private router: Router
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
        // Limpar os campos após atualizar a lista de sinais vitais
        this.clearFormFields();
      }, error => {
        console.error('Error fetching vital signs for user id', currentUser.id, error);
      });
    }
  }

  register(): void {
    const newVitalSigns: VitalSigns = {
      userId: 0, // Defina aqui o valor correto do ID do usuário (pode ser 0 temporariamente)
      bloodPressure: this.bloodPressure || 0,
      heartRate: this.heartRate || 0,
      bodyTemperature: this.bodyTemperature || 0,
      bloodGlucose: this.bloodGlucose || 0
    };

    this.userHealthDataService.registerVitalSigns(newVitalSigns).subscribe((response: VitalSigns) => {
      // Verificar se o registro foi bem-sucedido antes de atualizar a lista de sinais vitais
      if (response && response.userId) {
        this.getVitalSigns();
      } else {
        console.error('Error registering vital signs');
      }
    });
  }

  clearFormFields(): void {
    this.bloodPressure = null;
    this.heartRate = null;
    this.bodyTemperature = null;
    this.bloodGlucose = null;
  }
}






