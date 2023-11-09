import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { missReq } from '../models/missing.class';

@Injectable({
  providedIn: 'root'
})
export class MissingService {

  path = '';
  api = 'https://ontosoft.herokuapp.com/api';
  tempApi = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { 
  }

  missingUser(body: missReq){
    this.path = `${this.api}/user/forgetpassword`;
    return this.http.get(`${this.path}?Email=${body.email}&host=${body.host}`)
  }
}
