import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise, FoodDiaryEntry, Medication, SleepTrackerEntry, Symptom, Vaccination, VitalSigns } from '../interfaces/IHealt';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserHealthDataService {
  private baseUrl = 'http://localhost:5215/api/userhealthdata';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  getVitalSigns(): Observable<VitalSigns[]> {
    return this.http.get<VitalSigns[]>(`${this.baseUrl}/vitalSigns`);
  }

  getVitalSignsForUser(userId: number): Observable<VitalSigns[]> {
    return this.http.get<VitalSigns[]>(`${this.baseUrl}/vitalsign?userId=${userId}`);
  }


  registerVitalSigns(vitalSigns: VitalSigns): Observable<VitalSigns> {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
        vitalSigns.userId = currentUser.id;
        return this.http.post<VitalSigns>(`${this.baseUrl}/vitalsign`, vitalSigns);
    } else {
        throw new Error('Current user not found.');
    }
}


  getSymptomsForUser(userId: number): Observable<Symptom[]> {
    return this.http.get<Symptom[]>(`${this.baseUrl}/symptomMonitoring?userId=${userId}`);
  }

  registerSymptom(symptom: Symptom): Observable<any> {
    return this.http.post(`${this.baseUrl}/symptomMonitoring`, symptom);
  }

  getMedicationById(medicationId: number): Observable<Medication> {
    return this.http.get<Medication>(`${this.baseUrl}/medication/${medicationId}`);
  }

  updateMedication(medication: Medication): Observable<Medication> {
    return this.http.put<Medication>(`${this.baseUrl}/medication/${medication.userId}`, medication);
  }

  deleteMedication(medicationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/medication/${medicationId}`);
  }

  getMedicationsForUser(userId: number): Observable<Medication[]> {
    return this.http.get<Medication[]>(`${this.baseUrl}/medication?userId=${userId}`);
  }

  registerMedication(medication: Medication): Observable<Medication> {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      medication.userId = currentUser.id;
      return this.http.post<Medication>(`${this.baseUrl}/medication`, medication);
    } else {
      throw new Error('Current user not found.');
    }
}


  getExercisesForUser(userId: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.baseUrl}/exercises?userId=${userId}`);
  }

  registerExercise(exercise: Exercise): Observable<any> {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      exercise.userId = currentUser.id;
      return this.http.post(`${this.baseUrl}/exercises`, exercise);
    } else {
      throw new Error('Current user not found.');
    }
  }

  getFoodDiaryEntriesForUser(userId: number): Observable<FoodDiaryEntry[]> {
    return this.http.get<FoodDiaryEntry[]>(`${this.baseUrl}/foodDiary?userId=${userId}`);
  }

  registerFoodDiaryEntry(entry: FoodDiaryEntry): Observable<any> {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      entry.userId = currentUser.id;
      return this.http.post(`${this.baseUrl}/foodDiary`, entry);
    } else {
      throw new Error('Current user not found.');
    }
  }

  getSleepTrackerEntriesForUser(userId: number): Observable<SleepTrackerEntry[]> {
    return this.http.get<SleepTrackerEntry[]>(`${this.baseUrl}/sleepTracker?userId=${userId}`);
  }

  registerSleepTrackerEntry(entry: SleepTrackerEntry): Observable<any> {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.id) {
      entry.userId = currentUser.id;
      return this.http.post(`${this.baseUrl}/sleepTracker`, entry);
    } else {
      throw new Error('Current user not found.');
    }
  }

  getVaccinationSchedulesForUser(userId: number): Observable<Vaccination[]> {
    return this.http.get<Vaccination[]>(`${this.baseUrl}/calendarioVacinas?userId=${userId}`);
  }

  registrarCalendarioVacinas(calendario: Vaccination): Observable<Vaccination> {
    const usuarioAtual = this.authenticationService.getCurrentUser();
    if (usuarioAtual && usuarioAtual.id) {
      calendario.userId = usuarioAtual.id;
      return this.http.post<Vaccination>(`${this.baseUrl}/calendarioVacinas`, calendario);
    } else {
      throw new Error('Usuário atual não encontrado.');
    }
  }
}



