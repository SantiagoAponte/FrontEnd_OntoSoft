import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resetReq } from 'src/app/missing/models/reset.class';
import { environment } from 'src/environments/environment';
import { passReq } from '../models/password.class';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  path = '';
  api = 'https://ontosoft.herokuapp.com/api';
  tempApi = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { 
  }

  passwordUser(body: passReq,token : string){
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    this.path = `${this.api}/user/resetpassword`;
    return this.http.put(this.path,body,{headers:headers})
  }
  passwordOfDashboard(body: passReq,token : string){
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    this.path = `${this.api}/user/resetpassword`;
    return this.http.put(this.path,body,{headers:headers})
  }
}
