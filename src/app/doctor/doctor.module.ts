import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { SharedModule } from '../shared/shared.module';
import { DoctorRoutingModule } from './doctor.routing.module';
import { DoctorProfileComponent } from './pages/doctorProfile/doctorProfile.component';
import { PasswordResetDoctorComponent } from './pages/passwordResetDoctor/passwordResetDoctor.component';
import { RegistersOdontogramDoctorComponent } from './pages/registersOdontogramDoctor/registersOdontogramDoctor.component';
import { TableRegistersDashboardDoctorComponent } from './components/table-registers-dashboard-doctor/table-registers-dashboard-doctor.component';


@NgModule({
  imports: [
    CommonModule,
    DoctorRoutingModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [
    DoctorProfileComponent,
    PasswordResetDoctorComponent,
    RegistersOdontogramDoctorComponent,
    TableRegistersDashboardDoctorComponent
   
  ]
})

export class DoctorModule {}
