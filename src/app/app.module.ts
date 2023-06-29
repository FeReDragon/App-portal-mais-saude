import { NgModule } from '@angular/core';
import { LayoutComponent } from '../app/core-module/layout/layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NewsModuleModule } from '../app/news-module/news-module.module';
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



