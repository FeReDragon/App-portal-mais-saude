import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise, FoodDiaryEntry, Medication, SleepTrackerEntry, Symptom, VitalSigns } from '../interfaces/IHealt';
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

  getSymptomsForUser(userId: number): Observable<Symptom[]> {
    return this.http.get<Symptom[]>(`${this.apiUrl}/symptomMonitoring?userId=${userId}`);
  }

  registerSymptom(symptom: Symptom): Observable<any> {
    return this.http.post(`${this.apiUrl}/symptomMonitoring`, symptom);
  }

  getMedicationsForUser(userId: number): Observable<Medication[]> {
    return this.http.get<Medication[]>(`${this.apiUrl}/medications?userId=${userId}`);
  }

  registerMedication(medication: Medication): Observable<any> {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      medication.userId = currentUser.id;
      return this.http.post(`${this.apiUrl}/medications`, medication);
    } else {
      throw new Error('Current user not found.');
    }
  }

  getExercisesForUser(userId: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrl}/exercises?userId=${userId}`);
  }

  registerExercise(exercise: Exercise): Observable<any> {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      exercise.userId = currentUser.id;
      return this.http.post(`${this.apiUrl}/exercises`, exercise);
    } else {
      throw new Error('Current user not found.');
    }
  }

  getFoodDiaryEntriesForUser(userId: number): Observable<FoodDiaryEntry[]> {
    return this.http.get<FoodDiaryEntry[]>(`${this.apiUrl}/foodDiary?userId=${userId}`);
  }
  
  registerFoodDiaryEntry(entry: FoodDiaryEntry): Observable<any> {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      entry.userId = currentUser.id;
      return this.http.post(`${this.apiUrl}/foodDiary`, entry);
    } else {
      throw new Error('Current user not found.');
    }
  }
  
  getSleepTrackerEntriesForUser(userId: number): Observable<SleepTrackerEntry[]> {
    return this.http.get<SleepTrackerEntry[]>(`${this.apiUrl}/sleepTracker?userId=${userId}`);
  }
  
  registerSleepTrackerEntry(entry: SleepTrackerEntry): Observable<any> {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      entry.userId = currentUser.id;
      return this.http.post(`${this.apiUrl}/sleepTracker`, entry);
    } else {
      throw new Error('Current user not found.');
    }
  }
  
  // other methods...
}



