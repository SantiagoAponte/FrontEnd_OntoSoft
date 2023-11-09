import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ClinicHistoryComponent } from './pages/clinicHistory/clinicHistory.component';
@NgModule({
  declarations: [
    ClinicHistoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],

})
export class clinicHistoryModule{}
