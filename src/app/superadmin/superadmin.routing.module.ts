import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from '../shared/components/calendar/calendar.component';
import { HistoryClinicRegistersComponent } from './pages/historyClinicRegisters/historyClinicRegisters.component';
import { ListUsersComponent } from './pages/listUsers/listUsers.component';
import { OdontogramRegistersComponent } from './pages/odontogramRegisters/odontogramRegisters.component';
import { PasswordResetComponent } from './pages/passwordReset/passwordReset.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { UserComponent } from './pages/user/user.component';



export const SuperAdminRoutes: Routes = [
    { path: 'calendar/superadmin', component: CalendarComponent,pathMatch: 'full' },
    { path: 'profile/admin', component: UserComponent,pathMatch: 'full' },
    { path: 'asignrole', component: PersonalComponent, pathMatch: 'full' },
    { path: 'odontogramRegisters', component: OdontogramRegistersComponent, pathMatch: 'full' },
    { path: 'clinicHistoryRegisters', component: HistoryClinicRegistersComponent, pathMatch: 'full' },
    { path: 'listUsers', component: ListUsersComponent, pathMatch: 'full' },
    { path: 'passwordReset', component: PasswordResetComponent, pathMatch: 'full' },
];
@NgModule({
    imports: [RouterModule.forChild(SuperAdminRoutes)],
    exports: [RouterModule]
  })
  export class SuperAdminRoutingModule { }
