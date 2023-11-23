import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VitalSignsComponent } from './vital-signs/vital-signs.component';
import { SymptomMonitoringComponent } from './symptom-monitoring/symptom-monitoring.component';
import { MedicationLogComponent } from './medication-log/medication-log.component';
import { FoodDiaryComponent } from './food-diary/food-diary.component';
import { ExerciseLogComponent } from './exercise-log/exercise-log.component';
import { SleepTrackerComponent } from './sleep-tracker/sleep-tracker.component';
import { PrintableReportsComponent } from './printable-reports/printable-reports.component';
import { RouterModule } from '@angular/router';
import { HealthDataSummaryComponent } from './health-data-summary/health-data-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VaccinationScheduleComponent } from './vaccination-schedule/vaccination-schedule.component';
import { VitalSignsChartComponent } from './vital-signs/vital-signs-chart/vital-signs-chart.component';
import { SymptomMonitoringChartComponent } from './symptom-monitoring/symptom-monitoring-chart/symptom-monitoring-chart.component';
import { MedicationLogChartComponent } from './medication-log/medication-log-chart/medication-log-chart.component';
import { FoodDiaryChartComponent } from './food-diary/food-diary-chart/food-diary-chart.component';
import { ExerciseLogChartComponent } from './exercise-log/exercise-log-chart/exercise-log-chart.component';
import { SleepTrackerChartComponent } from './sleep-tracker/sleep-tracker-chart/sleep-tracker-chart.component';



@NgModule({
  declarations: [
    VitalSignsComponent,
    SymptomMonitoringComponent,
    MedicationLogComponent,
    FoodDiaryComponent,
    ExerciseLogComponent,
    SleepTrackerComponent,
    PrintableReportsComponent,
    HealthDataSummaryComponent,
    VaccinationScheduleComponent,
    VitalSignsChartComponent,
    SymptomMonitoringChartComponent,
    MedicationLogChartComponent,
    FoodDiaryChartComponent,
    ExerciseLogChartComponent,
    SleepTrackerChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserHealthDataModuleModule { }
