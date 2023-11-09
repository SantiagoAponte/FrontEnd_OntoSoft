import { Component, OnInit } from '@angular/core';
import { LoginService } from './auth/services/login.service';
import { SessionService } from './shared/services/session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _sessionService: SessionService, private _loginService: LoginService){

  }
  
  ngOnInit(): void {
    if(this._sessionService.getStorege('Token')!=null){
      this.isLogin() ? null : this._loginService.logOutUser();
  }
  }
  title = 'OntoSoft';

  isLogin():boolean{
    return this._sessionService.checkSession();
  }
}


