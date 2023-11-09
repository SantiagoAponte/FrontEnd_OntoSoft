import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { LoginService } from './auth/services/login.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorInterceptor } from './shared/services/interceptor/interceptor.interceptor';
import { clinicHistoryModule } from './clinicHistory/clinicHistory.module';
import { MissingModule } from './missing/missing.module';
import { PasswordModule } from './password/password.module';
import { OdontogramModule } from './odontogram/odontogram.module';
import { ToastrModule } from 'ngx-toastr';
import { SuperAdminModule } from './superadmin/superadmin.module';
import { PatientComponent } from './patient/patient.component';
import { PatientModule } from './patient/patient.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './home/pages/home/home.component';
import { DoctorComponent } from './doctor/doctor.component';
import { HomeModule } from './home/home.module';
import { RecepcionistComponent } from './recepcionist/recepcionist.component';


@NgModule({
  declarations: [		
    AppComponent,
    HeaderComponent,
    HomeComponent,
      DoctorComponent,
      RecepcionistComponent
   ],
  imports: [
    BrowserModule,
    HomeModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    OdontogramModule,
    clinicHistoryModule,
    MissingModule,
    PasswordModule,
    ToastrModule.forRoot(),
    SuperAdminModule,
    PatientModule
  ],
  providers: [
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
