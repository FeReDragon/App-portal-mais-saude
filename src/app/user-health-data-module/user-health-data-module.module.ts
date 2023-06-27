import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VitalSignsComponent } from './vital-signs/vital-signs.component';
import { SymptomMonitoringComponent } from './symptom-monitoring/symptom-monitoring.component';
import { MedicationLogComponent } from './medication-log/medication-log.component';
import { FoodDiaryComponent } from './food-diary/food-diary.component';
import { ExerciseLogComponent } from './exercise-log/exercise-log.component';
import { SleepTrackerComponent } from './sleep-tracker/sleep-tracker.component';



@NgModule({
  declarations: [
    VitalSignsComponent,
    SymptomMonitoringComponent,
    MedicationLogComponent,
    FoodDiaryComponent,
    ExerciseLogComponent,
    SleepTrackerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserHealthDataModuleModule { }
