import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissingComponent } from './pages/missing/missing.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    MissingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ]
})
export class MissingModule { }
