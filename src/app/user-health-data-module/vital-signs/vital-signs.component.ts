import { Component, OnInit } from '@angular/core';
import { VitalSigns } from '../../interfaces/IHealt';

import { AuthenticationService } from '../../services/authentication.service';
import { UserHealthDataService } from '../../services/user-health-data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vital-signs',
  templateUrl: './vital-signs.component.html',
  styleUrls: ['./vital-signs.component.scss']
})
export class VitalSignsComponent implements OnInit {
  vitalSigns: VitalSigns[] = [];
  bloodPressure: number | null = null;
  heartRate: number | null = null;
  bodyTemperature: number | null = null;
  bloodGlucose: number | null = null;

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
      bloodGlucose: this.bloodGlucose || 0,
      timestamp: new Date() // Adicionando o timestamp com a data atual
    };

    this.userHealthDataService.registerVitalSigns(newVitalSigns).subscribe(() => {
      // Atualizar a lista de sinais vitais após o registro ser concluído com sucesso
      this.getVitalSigns();
      // Limpar os valores dos inputs após o registro
      this.resetForm();
    });
  }

  resetForm(): void {
    this.bloodPressure = null;
    this.heartRate = null;
    this.bodyTemperature = null;
    this.bloodGlucose = null;
  }
}


