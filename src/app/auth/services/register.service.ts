import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterReq } from '../models/register.class';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  path = '';
  api = 'https://ontosoft.herokuapp.com/api';
  tempApi = 'http://localhost:5000/api';
  constructor(private http: HttpClient) { 
  }

  registerUser(body: RegisterReq){
    this.path = `${this.api}/user/register`;
    return this.http.post(this.path,body)
  }
}
