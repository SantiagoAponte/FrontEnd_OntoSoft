import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './pages/password/password.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PasswordModule { }
