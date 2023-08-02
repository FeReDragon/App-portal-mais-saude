import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VitalSigns } from '../interfaces/IHealt';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserHealthDataService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient, 
    private authenticationService: AuthenticationService // injected AuthenticationService
  ) { }

  getVitalSigns(): Observable<VitalSigns[]> {
    return this.http.get<VitalSigns[]>(`${this.apiUrl}/vitalSigns`);
  }

  getVitalSignsForUser(userId: number): Observable<VitalSigns[]> {
    return this.http.get<VitalSigns[]>(`${this.apiUrl}/vitalSigns?userId=${userId}`);
  }

  registerVitalSigns(bloodPressure: number, heartRate: number, bodyTemperature: number, bloodGlucose: number): void {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      const vitalSignsData = {
        userId: currentUser.id,
        bloodPressure,
        heartRate,
        bodyTemperature,
        bloodGlucose,
      };
      this.http.post(`${this.apiUrl}/vitalSigns`, vitalSignsData).subscribe((response: any) => {
        // Handle successful registration here, such as by fetching the updated list of vital signs
        this.getVitalSigns();
      }, (error: any) => {
        console.error('Error registering vital signs for user id', currentUser.id, error);
      });
    }
  }
  
  // other methods...
}
