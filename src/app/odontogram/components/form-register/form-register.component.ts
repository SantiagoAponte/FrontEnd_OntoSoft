import { Component, Input, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { OdontogramService } from '../../services/odontogram.service';


@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})

export class FormRegisterComponent implements OnInit {
  @Input() formRegister: any;
   typeProcessTooth = [];
   observation : Array<any> = [];
   IdclinicHistory:string = '';
   userId: string = '';
   public letter:string = '';

  constructor(
    public _OdontogramService: OdontogramService,
    public _AlertsService: AlertsService,
  ) 
  { 
  }
  // getLocalStorage(){
  //   this.typeProcessTooth = JSON.parse(localStorage.getItem("typeProcessTooth"));
  //   this.observation = JSON.parse(localStorage.getItem("observation"));
  //   this.userId = JSON.parse(localStorage.getItem("userId"));
  //   this.IdclinicHistory = JSON.parse(localStorage.getItem("clinicHistoryId"));
  // } 
 
  public data:any = {
    date_register: new Date,
    observation : [],
    UserId : '',
    clinicHistoryId: '',
    typeProcessTooth : [
    ]
  }
  postOdontogram(){
    let token = JSON.parse(localStorage.getItem("Token"));
      this._OdontogramService.PostOdontogram(this.data, token)
      .subscribe(data => {
        200
        this._AlertsService.successAlertOdontogram(`¡Se Guardo los registros del odontograma con éxito!`, `Aceptar`,)
        .then((res:any)=> {
          if(res.isConfirmed){
            localStorage.removeItem('typeProcessTooth');
            localStorage.removeItem('observation');
            localStorage.removeItem('userId');
            localStorage.removeItem('clinicHistoryId');
          }
        })
    }, err => {
        500
        this._AlertsService.warningAlert(`Ocurrio un error inesperado, comuniquese con el admnistrador`, `Error`, `Aceptar`)
        .then((res:any)=> {
          if(res.isConfirmed){
            // localStorage.removeItem('typeProcessTooth');
            // localStorage.removeItem('observation');
            // localStorage.removeItem('userId');
            // localStorage.removeItem('clinicHistoryId');
          }
        })
        406
        this._AlertsService.warningAlert(`Asegurese de primero haber creado una historia clinica para el usuario.`, `Error`, `Aceptar`)
        .then((res:any)=> {
          if(res.isConfirmed){
            // localStorage.removeItem('typeProcessTooth');
            // localStorage.removeItem('observation');
            // localStorage.removeItem('userId');
            // localStorage.removeItem('clinicHistoryId');
          }
        })
        400
        this._AlertsService.warningAlert(`No se pudo crear el Odontograma para el paciente, revise la información digitada`, `Error`, `Aceptar`)
        .then((res:any)=> {
          if(res.isConfirmed){
            // localStorage.removeItem('typeProcessTooth');
            // localStorage.removeItem('observation');
            // localStorage.removeItem('userId');
            // localStorage.removeItem('clinicHistoryId');
          }
        })
    })      
  }

  viewObservation(){
    this.observation = JSON.parse(localStorage.getItem("observation"));
    this.letter = this.observation.map(x=>x.observation).join("\n")
  }
  
  saveOdontogram(){
    this.typeProcessTooth = JSON.parse(localStorage.getItem("typeProcessTooth"));
    this.observation = JSON.parse(localStorage.getItem("observation"));
    this.userId = JSON.parse(localStorage.getItem("userId"));
    this.IdclinicHistory = JSON.parse(localStorage.getItem("clinicHistoryId"));
    var observaciones = this.observation.map(x=>x.observation).join(", ")
    this.letter = this.observation.map(x=>x.observation).join("\n")

    this.data.observation = observaciones;
    this.data.UserId = this.userId;
    this.data.clinicHistoryId = this.IdclinicHistory
    this.data.typeProcessTooth = this.typeProcessTooth;
  }
  ngOnInit(): void {

  }


}
