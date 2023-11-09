import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { LoginReq } from 'src/app/auth/models/login.class';
import { LoginService } from 'src/app/auth/services/login.service';
import { AlertsService } from '../../services/alerts/alerts.service';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _alertService: AlertsService,
    private _sessionService : SessionService, 
    private _authService: LoginService,
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    const checkSession = interval(10000);
    checkSession.subscribe(()=>{
      this._sessionService.checkSession() ? null : this.openAlert();
    });
  }
  
  getCurrentUser(){
    let user = this._sessionService.onSession();
    return user.UserName;
  }

  openAlert(){
    // let body = new LoginReq();
    this._alertService.warningAlert(`${this.getCurrentUser().toLowerCase()} su sesión a terminado por favor ingrese de nuevo`,null,'Volver a pagina principal')
    .then((res:any)=>{
      if(res.isConfirmed){
        localStorage.clear();
        this._authService.logOutUser();
        // this._authService.loginUser(body);
      }
      // }else{
      //   this._authService.logOutUser();
      // }
    });
  }

}
