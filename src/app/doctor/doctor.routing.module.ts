import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicHistoryComponent } from '../clinicHistory/pages/clinicHistory/clinicHistory.component';
import { OdontogramComponent } from '../odontogram/pages/odontogram/odontogram.component';
import { CalendarComponent } from '../shared/components/calendar/calendar.component';
import { DoctorProfileComponent } from './pages/doctorProfile/doctorProfile.component';
import { PasswordResetDoctorComponent } from './pages/passwordResetDoctor/passwordResetDoctor.component';
import { RegistersOdontogramDoctorComponent } from './pages/registersOdontogramDoctor/registersOdontogramDoctor.component';




export const DoctorRoutes: Routes = [
    { path: 'calendar/doctor',      component: CalendarComponent, pathMatch: 'full'},
    { path: 'odontogram',      component: OdontogramComponent, pathMatch: 'full'},
    { path: 'odontogramRegisters/doctor',      component:RegistersOdontogramDoctorComponent , pathMatch: 'full'},
    { path: 'historiaClinica',      component: ClinicHistoryComponent, pathMatch: 'full'},
    { path: 'passwordReset/doctor',      component:PasswordResetDoctorComponent , pathMatch: 'full'},
    { path: 'profile/doctor',      component: DoctorProfileComponent, pathMatch: 'full'},
    
];
@NgModule({
    imports: [RouterModule.forChild(DoctorRoutes)],
    exports: [RouterModule]
  })
  export class DoctorRoutingModule { }
