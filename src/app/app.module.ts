import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModuleModule } from './core-module/core-module.module';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { AuthenticationModuleModule } from './authentication-module/authentication-module.module';
import { EcommerceModuleModule } from './ecommerce-module/ecommerce-module.module';
import { UserHealthDataModuleModule } from './user-health-data-module/user-health-data-module.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModuleModule,
    AuthenticationModuleModule,
    EcommerceModuleModule,
    UserHealthDataModuleModule,
    CoreModuleModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



