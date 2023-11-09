import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _AlertsService: AlertsService,
  ) { }

  ngOnInit() {
    this.routingPath();
  }
  routingPath(){
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
      window.location.replace('/home/admin');
    } else if (user.rol === 'Paciente'){
      window.location.replace('/home/patient');
    }else if (user.rol === 'Recepcionista'){
      window.location.replace('/home/recepcionist');
    }else if (user.rol === 'Doctor'){
      window.location.replace('/home/doctor');
    }else if (user.rol === 'default'){
      this._AlertsService.warningAlert(`Opss... Aun no has sido aceptado en ontosoft, contacta con el administrador`, `Error`, `Aceptar`)
      .then((res:any)=>{
        if(res.isConfirmed){
          localStorage.removeItem('Token');
          window.location.replace('/auth/login');
        }
      })
    }
  }
 

}
