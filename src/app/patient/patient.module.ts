import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PatientComponent } from './patient.component';
import { FormsModule } from '@angular/forms';
import { PatientRoutingModule } from './patient.routing.module';
import { ProfilePatientComponent } from './pages/profilePatient/profilePatient.component';
import { ResetPasswordPatientComponent } from './pages/resetPasswordPatient/resetPasswordPatient.component';



@NgModule({
  declarations: [
    PatientComponent,
    ProfilePatientComponent,
    ResetPasswordPatientComponent
 
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PatientRoutingModule
    
  ]
})
export class PatientModule { }
