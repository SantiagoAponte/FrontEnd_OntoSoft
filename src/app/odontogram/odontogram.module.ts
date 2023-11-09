import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToothComponent } from './components/tooth/tooth.component';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OdontogramComponent } from './pages/odontogram/odontogram.component';

@NgModule({
  declarations: [
    ToothComponent,
    FormRegisterComponent,
    OdontogramComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
})
export class OdontogramModule{}
