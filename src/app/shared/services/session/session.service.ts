import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { currentUser } from '../../models/token.class';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() {  }

  helper = new JwtHelperService();
  getStorege = (item:string) => localStorage.getItem(item) ? localStorage.getItem(item) : null; 

  checkSession(){
    let token = this.getStorege('Token');
    let res:boolean;
    if(token){
      return !this.helper.isTokenExpired(token);
    }
    return false;
  }

  onSession():currentUser{
    let token = this.getStorege('Token');
    let user = new currentUser; 
    if(token){
      const decodedToken = this.helper.decodeToken(token);
      user.Id=decodedToken.sub;
      user.UserName=decodedToken.nameid;
      user.Email=decodedToken.email;
      user.fullName=decodedToken.name;
      user.rol=decodedToken.role;
    }
    return user;
  }

}