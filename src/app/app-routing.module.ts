import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CalendarComponent } from '../app/shared/components/calendar/calendar.component';
import { ClinicHistoryComponent } from './clinicHistory/pages/clinicHistory/clinicHistory.component';
import { MissingComponent } from './missing/pages/missing/missing.component';
import { PasswordComponent } from './password/pages/password/password.component';
import { OdontogramComponent } from './odontogram/pages/odontogram/odontogram.component';
import { SuperAdminComponent } from './superadmin/superadmin.component';
import { GuardGuard } from './shared/services/guard/guard.guard';
import { UserComponent } from './superadmin/pages/user/user.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { HomeComponent } from './home/pages/home/home.component';
import { RecepcionistComponent } from './recepcionist/recepcionist.component';
// import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo : '/auth/login',
  },
  { 
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
    canLoad: [GuardGuard]  
  },
  { 
    path: 'home',
    component: HomeComponent,
    canActivate: [GuardGuard],
  },
  {
    path: 'home/admin',
    component: SuperAdminComponent,
    loadChildren: () => import('./superadmin/superadmin.module').then( m => m.SuperAdminModule ),
    canActivate: [GuardGuard],
  },
  {
    path: 'home/patient',
    component: PatientComponent,
    loadChildren: () => import('./patient/patient.module').then( m => m.PatientModule ),
    canActivate: [GuardGuard],
  },
  {
    path: 'home/recepcionist',
    component: RecepcionistComponent,
    loadChildren: () => import('./recepcionist/recepcionist.module').then( m => m.RecepcionistModule ),
    canActivate: [GuardGuard],
  },
  {
    path: 'home/doctor',
    component: DoctorComponent,
    loadChildren: () => import('./doctor/doctor.module').then( m => m.DoctorModule ),
    canActivate: [GuardGuard],
  },
  {
    path: 'missing',
    component: MissingComponent,
  },
// Esta es ruta para que siempre entre a cambiar la contra
  {
    path: 'password',
    component: PasswordComponent,
  }, 
  {
    path: '**',
    redirectTo: 'auth'
  },
   // Esta es ruta para que siempre entre para recuperar contraseña
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
