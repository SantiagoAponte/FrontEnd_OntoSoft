import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTESRECEPCIONIST: RouteInfo[] = [
   { path: 'calendar/recepcionist',     title: 'Mis Citas',            icon:'nc-badge',  class: '' },//recepcionista
   { path: 'passwordReset/recepcionist', title: 'Cambiar Contraseña', icon:'nc-touch-id',      class: '' },  //recepcionista
   { path: 'profile/recepcionist',     title: 'Perfil',            icon:'nc-single-02',  class: '' },//recepcionista

];
export const ROUTESPATIENT: RouteInfo[] = [
   { path: 'calendar/patient',     title: 'Mis Citas',            icon:'nc-badge',  class: '' },//paciente
   { path: 'passwordReset/patient', title: 'Cambiar Contraseña', icon:'nc-touch-id',      class: '' },  //paciente
   { path: 'profile/patient',     title: 'Perfil',            icon:'nc-single-02',  class: '' },//paciente

];
export const ROUTESSUPERADMIN: RouteInfo[] = [
  { path: 'calendar/superadmin',     title: 'Calendario de Citas',         icon:'nc-badge',       class: '' }, //SuperAdmin
  { path: 'asignrole',     title: 'Aceptar usuarios',  icon:'nc-badge',      class: '' },  //SuperAdmin
  { path: 'odontogramRegisters', title: 'Registros odontograma',  icon:'nc-single-copy-04',      class: '' },  //SuperAdmin
  { path: 'clinicHistoryRegisters', title: 'Historias Clinicas', icon:'nc-bullet-list-67',      class: '' },  //SuperAdmin
  { path: 'listUsers', title: 'Usuarios Activos', icon:'nc-check-2',      class: '' },  //SuperAdmin
  { path: 'passwordReset', title: 'Cambiar Contraseña', icon:'nc-touch-id',      class: '' },  //SuperAdmin
  { path: 'profile/admin',          title: 'Perfil',      icon:'nc-single-02',  class: '' },  //SuperAdmin
];
export const ROUTESDOCTOR: RouteInfo[] = [
  { path: 'calendar/doctor',     title: 'Citas',         icon:'nc-badge',  class: '' }, //doctor
  { path: 'odontogram',     title: 'Odontograma',         icon:'nc-badge',   class: '' }, //doctor
  { path: 'odontogramRegisters/doctor',     title: 'Registros odontograma', icon:'nc-single-copy-04', class: '' }, //doctor
  { path: 'historiaClinica',     title: 'Registrar Historia Clinica', icon:'nc-bullet-list-67', class: '' }, //doctor
  { path: 'passwordReset/doctor', title: 'Cambiar Contraseña', icon:'nc-touch-id',      class: '' },  //doctor
  { path: 'profile/doctor',     title: 'Perfil', icon:'nc-single-02', class: '' }, //doctor
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  constructor() { }

  public menuItems: any[];
    ngOnInit() {
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
  if(user.rol === 'SuperAdmin'){
    this.menuItems = ROUTESSUPERADMIN.filter(menuItem => menuItem);
  } else if(user.rol === 'Paciente'){
    this.menuItems = ROUTESPATIENT.filter(menuItem => menuItem);
  }else if(user.rol === 'Doctor'){
    this.menuItems = ROUTESDOCTOR.filter(menuItem => menuItem);
  }else if(user.rol === 'Recepcionista'){
    this.menuItems = ROUTESRECEPCIONIST.filter(menuItem => menuItem);
  }
  
       
    }
}
