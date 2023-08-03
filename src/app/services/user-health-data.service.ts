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
    private authenticationService: AuthenticationService
  ) { }

  getVitalSigns(): Observable<VitalSigns[]> {
    return this.http.get<VitalSigns[]>(`${this.apiUrl}/vitalSigns`);
  }

  getVitalSignsForUser(userId: number): Observable<VitalSigns[]> {
    return this.http.get<VitalSigns[]>(`${this.apiUrl}/vitalSigns?userId=${userId}`);
  }

  registerVitalSigns(vitalSigns: VitalSigns): Observable<VitalSigns> {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      vitalSigns.userId = currentUser.id;
      return this.http.post<VitalSigns>(`${this.apiUrl}/vitalSigns`, vitalSigns);
    } else {
      throw new Error('Current user not found.');
    }
  }

  // other methods...
}


