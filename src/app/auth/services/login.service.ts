import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginReq } from 'src/app/auth/models/login.class';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  path = '';
  api = 'https://ontosoft.herokuapp.com/api';
  tempApi = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { 
  }

  loginUser(body: LoginReq){
    this.path = `${this.api}/user/login`;
    return this.http.post(this.path,body)
  }


  logOutUser(){
    localStorage.clear();
    window.location.replace('/auth/login');
  }
}
