import { NgModule } from '@angular/core';
import { UserProfileComponent } from '../app/authentication-module/user-profile/user-profile.component'; 
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../app/core-module/layout/layout.component';
import { LoginComponent } from './authentication-module/login/login.component';
import { RegisterComponent } from './authentication-module/register/register.component';
import { ForgotPasswordComponent } from './authentication-module/forgot-password/forgot-password.component';
import { PrivacySettingsComponent } from './authentication-module/privacy-settings/privacy-settings.component';
import { NewsListComponent } from './news-module/news-list/news-list.component';
import { NewsDetailsComponent } from './news-module/news-details/news-details.component';
import { ProductListComponent } from './ecommerce-module/product-list/product-list.component';
import { ProductDetailsComponent } from './ecommerce-module/product-details/product-details.component';
import { CartComponent } from './ecommerce-module/cart/cart.component';
import { CheckoutComponent } from './ecommerce-module/checkout/checkout.component';
import { VitalSignsComponent } from './user-health-data-module/vital-signs/vital-signs.component';
import { SymptomMonitoringComponent } from './user-health-data-module/symptom-monitoring/symptom-monitoring.component';
import { MedicationLogComponent } from './user-health-data-module/medication-log/medication-log.component';
import { FoodDiaryComponent } from './user-health-data-module/food-diary/food-diary.component';
import { ExerciseLogComponent } from './user-health-data-module/exercise-log/exercise-log.component';
import { SleepTrackerComponent } from './user-health-data-module/sleep-tracker/sleep-tracker.component';
import { PrintableReportsComponent } from './user-health-data-module/printable-reports/printable-reports.component';
import { HealthDataSummaryComponent } from './user-health-data-module/health-data-summary/health-data-summary.component';
import { ProductCategoriesComponent } from './ecommerce-module/product-categories/product-categories.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'homem', component: LayoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'privacy-settings', component: PrivacySettingsComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'home', component: NewsListComponent },
  { path: 'news/:id', component: NewsDetailsComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'categoria-produtos', component: ProductCategoriesComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'vital-signs', component: VitalSignsComponent },
  { path: 'symptom-monitoring', component: SymptomMonitoringComponent },
  { path: 'medication-log', component: MedicationLogComponent },
  { path: 'food-diary', component: FoodDiaryComponent },
  { path: 'exercise-log', component: ExerciseLogComponent },
  { path: 'sleep-tracker', component: SleepTrackerComponent },
  { path: 'monitor-saude', component: HealthDataSummaryComponent },
  { path: 'printable-reports', component: PrintableReportsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
