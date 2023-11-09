import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './pages/user/user.component';
import { SharedModule } from '../shared/shared.module';
import { SuperAdminComponent } from './superadmin.component';
import { SuperAdminRoutingModule } from './superadmin.routing.module';
import { TablePersonalComponent } from './components/table-personal/table-personal.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { OdontogramRegistersComponent } from './pages/odontogramRegisters/odontogramRegisters.component';
import { TableRegistersOdontogramComponent } from './components/table-registers-odontogram/table-registers-odontogram.component';
import { HistoryClinicRegistersComponent } from './pages/historyClinicRegisters/historyClinicRegisters.component';
import { TableRegistersClinicHistoryComponent } from './components/table-registers-clinicHistory/table-registers-clinicHistory.component';
import { TableUserComponent } from './components/table-user/table-user.component';
import { ListUsersComponent } from './pages/listUsers/listUsers.component';
import { PasswordResetComponent } from './pages/passwordReset/passwordReset.component';

@NgModule({
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [
    SuperAdminComponent,
    TablePersonalComponent,
    TableRegistersOdontogramComponent,
    OdontogramRegistersComponent,
    TableRegistersClinicHistoryComponent,
    HistoryClinicRegistersComponent,
    PasswordResetComponent,
    TableUserComponent,
    ListUsersComponent,
    PersonalComponent,
    UserComponent,
  ]
})

export class SuperAdminModule {}
