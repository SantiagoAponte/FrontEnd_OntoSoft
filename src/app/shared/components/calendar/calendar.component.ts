import { Component, Input, OnInit} from '@angular/core';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/angular';
// import { createEventId, INITIAL_EVENTS } from './event-utils';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarService } from './services/calendar.service'
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MailServiceService } from '../../services/sendMails/mailService.service';
import { ClinicHistoryService } from 'src/app/clinicHistory/services/clinicHistory.service';
import { taskGetUserDetails } from 'src/app/clinicHistory/interfaces/taskGetUserDetails';

export interface tempTask {
  email:string;
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  private dialogConfig = new MatDialogConfig();
  @Input() User: any;
  data:any = []
  detailsUser:any = []

  public typeUser:any;
  appoinmentId: string;
  constructor(
    public dialog: MatDialog,
    private CalendarService: CalendarService,
    private _AlertsService: AlertsService,
    private _MailServiceService :  MailServiceService,
    private _ClinicHistoryService : ClinicHistoryService
    ) {}

    public calendarOptions: CalendarOptions = {
    
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
     
      
    },
    initialView: 'dayGridMonth',
    weekends: true, // <-- fines de semana
    // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    editable: true,
    selectable: true,
    selectMirror: false,
    dayMaxEvents: true,
    locale: esLocale,
    progressiveEventRendering: true
    
    // eventsSet: this.handleEvents.bind(this)
  };
  
  getAllAppoinments2(){
    let token = JSON.parse(localStorage.getItem("Token"));
    this.CalendarService.getAllAppoinments(token)
    .subscribe((res:any)=>{
      res.map((i:any) =>{
            let obj = {
              id: i.id,
              date: i.date,
              title: i.title,
              text: i.text, 
            }
            this.data.push(obj)
          })
      this.calendarOptions.events=this.data;
    });
}
 
  /* CONSUMO DE SERVICIOS PARA LAS CITAS, PERO SE DEBEN DE AÑADIR A SEGUN EL EVENTO.*/

    handleEvents(userId:string){
      // let data = [];
      this.CalendarService.getAppoinmentIdUser(userId)
      .subscribe((res:any)=>{
        res.appoinments.map((i:any) =>{
              let obj = {
                id: i.id,
                date: i.date,
                title: i.title,
                text: i.text,    
              }
              this.data.push(obj)
            })
        this.calendarOptions.events=this.data;
      });
    }

  
  ngOnInit(): void {  
    this.checkUser();
}

  checkUser(){
    let token = JSON.parse(localStorage.getItem("Token"));
    let helper = new JwtHelperService(token);
    const decodedToken = helper.decodeToken(token);

    let user = {
      Id : decodedToken.sub,
      UserName : decodedToken.nameid,
      Email : decodedToken.email,
      fullName : decodedToken.name,
      rol : decodedToken.role
    }
    this.typeUser = user.rol;
    if (user.rol === 'Paciente'){
     this.calendarOptions.selectMirror=false,
     this.calendarOptions.eventClick = this.viewAppoinmentPatient.bind(this);
     this.handleEvents(user.Id);
     
    };
    if (user.rol === 'SuperAdmin' || user.rol === 'Recepcionista'){
      this.calendarOptions.dateClick = this.createAppoinment.bind(this);
      this.calendarOptions.eventClick = this.editAppoinment.bind(this);
      this.getAllAppoinments2();
    };
    if(user.rol === 'Doctor'){
      this.calendarOptions.eventClick = this.viewAppoinmentDoctor.bind(this);
      this.handleEvents(user.Id);
    }
  };

  editAppoinment(clickInfo: EventClickArg){
    let token = JSON.parse(localStorage.getItem("Token"));
    let helper = new JwtHelperService(token);
    const decodedToken = helper.decodeToken(token);
    let id:string = clickInfo.event._def.publicId;
    this.appoinmentId = clickInfo.event._def.publicId;
    this.dialogConfig.disableClose = false;
    let titleModal: string;

    let user = {
      Id : decodedToken.sub,
      UserName : decodedToken.nameid,
      Email : decodedToken.email,
      fullName : decodedToken.name,
      rol : decodedToken.role
    }
     this.data.map((i:any) =>{
      let obj = {
        id: i.id,
        date: i.date,
        title: i.title,
        text: i.text, 
      }
      let date:Array<string> = this.chooseDate(obj.date);
      let text = obj.title
      let observation = obj.text
      this.CalendarService.getAppoinmentIdCita(obj.id,token)
      .subscribe((res:any)=>{
      let personDoctor = res.users[1].fullName;
      let personPatient = res.users[0].fullName;
    
    titleModal = 'Editar Cita'
    this.dialogConfig.data = {
      title: titleModal,
      Modal: 'editAppoinment',
      id: id,
      dateSelect: date,
      text:text,
      observation: observation,
      person: personDoctor,
      person2: personPatient
    };
  })
})
    setTimeout(()=>{
    this.openModal();
      },500)
};
  createAppoinment(selectInfo:any) {
    let token2 = JSON.parse(localStorage.getItem("Token"));
    this._ClinicHistoryService.getDetailsIdUser('',token2)
    .subscribe((res: any) => {
       let obj : tempTask ={
         email: res.email
       }
      this.detailsUser.push(obj); 
  //  let email = this.detailsUser[0].email;
    })
    let token = JSON.parse(localStorage.getItem("Token"));
    let helper = new JwtHelperService(token);
    const decodedToken = helper.decodeToken(token);

    let user = {
      Id : decodedToken.sub,
      UserName : decodedToken.nameid,
      Email : decodedToken.email,
      fullName : decodedToken.name,
      rol : decodedToken.role
    }
    let date:Array<string> = this.chooseDate(selectInfo.dateStr);
    // let id:string = clickInfo.event._def.publicId;
    this.dialogConfig.disableClose = true;
    let titleModal: string;
    if(user.rol === 'Recepcionista' || user.rol === 'SuperAdmin'){
      titleModal = 'Crear Cita'
    } 
    this.dialogConfig.data = {
      title: titleModal,
      Modal: 'createAppoinment',
      dateSelect: date,
    };
    this.openModal();
  }

  viewAppoinmentPatient() {
    let token = JSON.parse(localStorage.getItem("Token"));
    let helper = new JwtHelperService(token);
    const decodedToken = helper.decodeToken(token);

    let user = {
      Id : decodedToken.sub,
      UserName : decodedToken.nameid,
      Email : decodedToken.email,
      fullName : decodedToken.name,
      rol : decodedToken.role
    }
     this.data.map((i:any) =>{
      let obj = {
        id: i.id,
        date: i.date,
        title: i.title,
        text: i.text, 
      }
      let date:Array<string> = this.chooseDate(obj.date);
      let token = JSON.parse(localStorage.getItem("Token"));
      let text = obj.title
      let observation = obj.text
      this.CalendarService.getAppoinmentIdCita(obj.id, token)
      .subscribe((res:any)=>{
      let person = res.users[1].fullName; // Se configura asi porque siempre la posicion 1 en el array estara el doctor
    // let id:string = clickInfo.event._def.publicId;
    this.dialogConfig.disableClose = true;
    let titleModal: string;
  
    this.dialogConfig.data = {
      title: 'Detalles de Cita',
      Modal: 'viewAppoinment',
      dateSelect: date,
      text:text,
      observation: observation,
      person: person
    };
  })
  })
  setTimeout(()=>{
    this.openModal();
  },500)
}

viewAppoinmentDoctor() {
  let token = JSON.parse(localStorage.getItem("Token"));
  let helper = new JwtHelperService(token);
  const decodedToken = helper.decodeToken(token);

  let user = {
    Id : decodedToken.sub,
    UserName : decodedToken.nameid,
    Email : decodedToken.email,
    fullName : decodedToken.name,
    rol : decodedToken.role
  }
   this.data.map((i:any) =>{
    let obj = {
      id: i.id,
      date: i.date,
      title: i.title,
      text: i.text, 
    }
    let date:Array<string> = this.chooseDate(obj.date);
    let text = obj.title
    let observation = obj.text
    this.CalendarService.getAppoinmentIdCita(obj.id, token)
    .subscribe((res:any)=>{
            let person = res.users[0].fullName; // Se configura asi porque siempre la posicion 1 en el array estara el doctor
  // let id:string = clickInfo.event._def.publicId;
  this.dialogConfig.disableClose = true;
  let titleModal: string;
  titleModal = 'Detalles de Cita'

  this.dialogConfig.data = {
    title: titleModal,
    Modal: 'viewAppoinmentDoctor',
    dateSelect: date,
    text:text,
    observation: observation,
    person: person
  };
})
})
setTimeout(()=>{
  this.openModal();
},500)
}
  chooseDate(date:string):Array<string>{
    let responseDate:Array<string>=[];
    if(date.includes('T')){
      responseDate = date.split('T');
      responseDate[1] = responseDate[1].split('-')[0];
    }else{
      responseDate.push(date);
    }
    return responseDate;
  }

  openModal():void{
  
    this.dialogConfig.autoFocus = true;
    let customWidth:string;

    if(window.innerWidth <= 600){
      customWidth='100%';
    }else{
      customWidth='50%';
    }  
    
    this.dialogConfig.width = customWidth;
    const dialogRef = this.dialog.open(ModalComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(res =>{
      if(typeof res != 'undefined'){
        /* VER CITA */
        if(res.optType==='viewAppoinment'){
        
        }
        /* EDITAR CITA*/
        if(res.optType==='editAppoinment'){
          let token = JSON.parse(localStorage.getItem("Token"));
          let tempDate = res.data.date
          let time = res.data.hour
          let appoinmetId = this.appoinmentId
          let fullDate = `${res.data.date}T${res.data.hour}:00`;
          let newFullDate = new Date(fullDate) //.toISOString().replace(/T.*$/, '');
          res.data.date = newFullDate;
          let users = [res.data.Paciente,res.data.Doctor];
          res.data.ListUsers = users;

          this._ClinicHistoryService.getDetailsIdUser(res.data.Paciente, token)
              .subscribe((res: any) => {
                //  let obj : tempTask ={
                //    email: res.email
                //  }
                // this.detailsUser.push(obj); 
            //  let email = this.detailsUser[0].email;
             setTimeout(()=>{
              this._MailServiceService.updatedAppoinmentMail(res.email,tempDate,time, token)
              .subscribe((response : any)=> {
              })
            },100)
            })
            this.CalendarService.updateAppoinment(res.data, appoinmetId, token)
            .subscribe((response : any)=> {
              200
              this._AlertsService.successAlert(`¡Se actualizo la cita con éxito!`, `Aceptar`,)
              .then((res:any) =>{
                if(res.isConfirmed){
                  if(this.typeUser === 'SuperAdmin'){
                    window.location.replace('/home/admin/calendar/superadmin')
                  } else if (this.typeUser === 'Recepcionista'){
                    window.location.replace('/home/recepcionist/calendar/recepcionist')
                  }else if (this.typeUser === 'Paciente'){
                    window.location.replace('/home/patient/calendar/patient')
                  }else if (this.typeUser === 'Doctor'){
                    window.location.replace('/home/doctor/calendar/doctor')
                  }
                }
              })
              // Entra aquí con respuesta del servicio correcta código http 200
          }, err => {
              // Entra aquí si el servicio entrega un código http de error EJ: 404,
                500
                this._AlertsService.warningAlert(`Ocurrio un error inesperado, comuniquese con el admnistrador`, `Error`, `Aceptar`)
                406
                this._AlertsService.warningAlert(`No se encontro la cita del paciente, revisa si fue creada o comuniquese con el admnistrador`, `Error`, `Aceptar`)
                400
                this._AlertsService.warningAlert(`No se actualizo la cita del paciente, espere un momento o comuniquese con el administrador`, `Error`, `Aceptar`)
              })
 
      }
        /*CREAR CITA*/
        if(res.optType==='createAppoinment'){
          let token = JSON.parse(localStorage.getItem("Token"));
          let tempDate = res.data.date
          let time = res.data.hour
          let fullDate = `${res.data.date}T${res.data.hour}:00`;
          let newFullDate = new Date(fullDate) //.toISOString().replace(/T.*$/, '');
          res.data.date = newFullDate;
          let users = [res.data.Paciente,res.data.Doctor];
          res.data.ListUsers = users;
        
            this._ClinicHistoryService.getDetailsIdUser(res.data.Paciente, token)
              .subscribe((res: any) => {
                let token = JSON.parse(localStorage.getItem("Token"));
                //  let obj : tempTask ={
                //    email: res.email
                //  }
                // this.detailsUser.push(obj); 
            //  let email = this.detailsUser[0].email;
             setTimeout(()=>{
              this._MailServiceService.createAppoinmentMail(res.email,tempDate,time, token)
              .subscribe((response : any)=> {
              })
            },100)
            })
          this.CalendarService.PostAppoinment(res.data, token)
          .subscribe((response : any)=> {
            200
            this._AlertsService.successAlert(`¡Se creo la cita con éxito!`, `Aceptar`,)
            .then((res:any) =>{
              if(res.isConfirmed){
                if(this.typeUser === 'SuperAdmin'){   
                  window.location.replace('/home/admin/calendar/superadmin')
                } else if (this.typeUser === 'Recepcionista'){
                  window.location.replace('/home/recepcionist/calendar/recepcionist')
                }else if (this.typeUser === 'Paciente'){
                  window.location.replace('/home/patient/calendar/patient')
                }else if (this.typeUser === 'Doctor'){
                  window.location.replace('/home/doctor/calendar/doctor')
                }
              }
            })
            // Entra aquí con respuesta del servicio correcta código http 200
        }, err => {
            // Entra aquí si el servicio entrega un código http de error EJ: 404,
              500
              this._AlertsService.warningAlert(`Ocurrio un error inesperado, comuniquese con el admnistrador`, `Error`, `Aceptar`)
              406
              this._AlertsService.warningAlert(`No se encontro la cita del paciente, revisa si fue creada o comuniquese con el admnistrador`, `Error`, `Aceptar`)
              400
              this._AlertsService.warningAlert(`No se creo la cita del paciente, espere un momento o comuniquese con el administrador`, `Error`, `Aceptar`)
            })
       }
        
        /*ELIMINAR CITA*/
        if(res.optType==='delete'){
          let token = JSON.parse(localStorage.getItem("Token"));
        let appoinmetId = this.appoinmentId
        this.CalendarService.deleteAppoinment(appoinmetId, token)
        .subscribe((response : any)=> {
          200
          this._AlertsService.successAlert(`¡Se elimino la cita con éxito!`, `Aceptar`,)
          .then((res:any) =>{
            if(res.isConfirmed){
              if(this.typeUser === 'SuperAdmin'){
                window.location.replace('/home/admin/calendar/superadmin')
              } else if (this.typeUser === 'Recepcionista'){
                window.location.replace('/home/recepcionist/calendar/recepcionist')
              }else if (this.typeUser === 'Paciente'){
                window.location.replace('/home/patient/calendar/patient')
              }else if (this.typeUser === 'Doctor'){
                window.location.replace('/home/doctor/calendar/doctor')
              }
            }
          })
          // Entra aquí con respuesta del servicio correcta código http 200
      }, err => {
          // Entra aquí si el servicio entrega un código http de error EJ: 404,
            500
            this._AlertsService.warningAlert(`Ocurrio un error inesperado, comuniquese con el admnistrador`, `Error`, `Aceptar`)
            406
            this._AlertsService.warningAlert(`No se encontro la cita del paciente, revisa si fue creada o comuniquese con el admnistrador`, `Error`, `Aceptar`)
            400
            this._AlertsService.warningAlert(`No se pudo eliminar la cita del paciente, espere un momento o comuniquese con el administrador`, `Error`, `Aceptar`)
          })
        }
      }
    })
  }
}

