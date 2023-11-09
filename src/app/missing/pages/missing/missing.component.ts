import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { missReq } from '../../models/missing.class';
import { MissingService } from '../../services/missing.service';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';

@Component({
  selector: 'app-missing',
  templateUrl: './missing.component.html',
  styleUrls: ['./missing.component.css']
})
export class MissingComponent implements OnInit {

  formMissing : FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;%$:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public rute : string = '';

  constructor(private _MissingService : MissingService,private _AlertsService : AlertsService) { 
    this.formMissing = this.createFormGroupMissing();
  }

  ngOnInit(): void {
    
  }

  createFormGroupMissing() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(this.emailPattern)]),
    });
  }

  send(): any {
    if (this.formMissing.valid) {
      let body = new missReq();
      this.rute=`${window.location.protocol}//${window.location.host}`;
      body.email = this.formMissing.value.email;
      body.host  = this.rute;
      this._MissingService.missingUser(body)
      .subscribe((response : any)=>{
        200
        this._AlertsService.successAlert('Por favor, revisa tu correo, te he enviado el correo de recuperación.', `Envio exitoso`)
      }, Error =>{
        500
        this._AlertsService.errorAlert('Por favor, ponte en contacto con el administrador.', `¡Ups!...Error inesperado`)
        406
        this._AlertsService.errorAlert('Por favor, Verifica el correo, lo desconozco.', `¡Correo no encontrado!`)
      })
    }
    else {
      console.log('Formulario invalido');
    }

  }

}
