import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from '../app/authentication-module/user-profile/user-profile.component'; 
import { LayoutComponent } from '../app/core-module/layout/layout.component';
import { LoginComponent } from './authentication-module/login/login.component';
import { RegisterComponent } from './authentication-module/register/register.component';
import { ForgotPasswordComponent } from './authentication-module/forgot-password/forgot-password.component';
import { PrivacySettingsComponent } from './authentication-module/privacy-settings/privacy-settings.component';
import { NewsListComponent } from './news-module/news-list/news-list.component';
import { NewsDetailComponent } from './news-module/news-details/news-details.component';
import { ProductListComponent } from '../app/ecommerce-module/product-list/product-list.component';
import { ProductDetailsComponent } from './ecommerce-module/product-details/product-details.component';
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
import { AuthGuard } from './auth.guard';
import { ProductCategoryDetailsComponent } from './ecommerce-module/product-category-details/product-category-details.component';
import { CartComponent } from './ecommerce-module/cart/cart.component';
import { ResetPasswordComponent } from './authentication-module/reset-password/reset-password.component';
import { TermoUsoComponent } from './shared-module/termo-uso/termo-uso.component';
import { NotFoundComponent } from './shared-module/not-found/not-found.component';
import { SobreComponent } from './shared-module/sobre/sobre.component';

const routes: Routes = [
  // Rotas públicas
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'lista-produtos', component: ProductListComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'categorias-produtos', component: ProductCategoriesComponent },
  { path: 'home', component: NewsListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product-category/:category', component: ProductCategoryDetailsComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'news/:id', component: NewsDetailComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'termos-de-uso', component: TermoUsoComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'sobre', component: SobreComponent },


  // Rotas restritas
  { path: 'privacy-settings', component: PrivacySettingsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'vital-signs', component: VitalSignsComponent, canActivate: [AuthGuard] },
  { path: 'symptomMonitoring', component: SymptomMonitoringComponent, canActivate: [AuthGuard] },
  { path: 'medication-log', component: MedicationLogComponent, canActivate: [AuthGuard] },
  { path: 'food-diary', component: FoodDiaryComponent, canActivate: [AuthGuard] },
  { path: 'exercise-log', component: ExerciseLogComponent, canActivate: [AuthGuard] },
  { path: 'sleep-tracker', component: SleepTrackerComponent, canActivate: [AuthGuard] },
  { path: 'printable-reports', component: PrintableReportsComponent, canActivate: [AuthGuard] },
  { path: 'monitor-saude', component: HealthDataSummaryComponent, canActivate: [AuthGuard] },
  { path: 'carrinho', component: CartComponent, canActivate: [AuthGuard] },
  // ... Outras rotas restritas

  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

