import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from '../shared/components/calendar/calendar.component';
import { ProfilePatientComponent } from './pages/profilePatient/profilePatient.component';
import { ResetPasswordPatientComponent } from './pages/resetPasswordPatient/resetPasswordPatient.component';



export const PatientRoutes: Routes = [
    { path: 'profile/patient', component: ProfilePatientComponent, pathMatch: 'full' },
    { path: 'calendar/patient', component: CalendarComponent, pathMatch: 'full' },
    { path: 'passwordReset/patient', component: ResetPasswordPatientComponent, pathMatch: 'full' },
    // { path: 'icons',          component: IconsComponent, pathMatch: 'full' },
    // { path: 'notifications',  component: NotificationsComponent, pathMatch: 'full' },
    // { path: 'upgrade',        component: UpgradeComponent, pathMatch: 'full' },
];
@NgModule({
    imports: [RouterModule.forChild(PatientRoutes)],
    exports: [RouterModule]
  })
  export class PatientRoutingModule { }
