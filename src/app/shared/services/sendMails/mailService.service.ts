import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { taskPostAddRol } from '../../components/calendar/interfaces/roles/taskPostAddRol';
import { taskPost } from '../../components/calendar/interfaces/taskPost';

@Injectable({
  providedIn: 'root'
})
export class MailServiceService {
  path = '';
  api = 'https://ontosoft.herokuapp.com/api';
  tempApi = 'http://localhost:5000/api';
constructor(
  private http: HttpClient
) { }

activatedUser(email:string, token : string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/user/activated`;
  return this.http.get(`${this.path}?email=${email}`,{headers:headers})
}
deleteAppoinment(email:string, token : string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/user/deleteAppoinment`;
  return this.http.get(`${this.path}?email=${email}`, {headers:headers})
}

createAppoinmentMail(email:string, date:string, time:string, token : string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/user/createdAppoinment`;
  return this.http.get(`${this.path}?email=${email}&date=${date}&time=${time}`,{headers:headers})
}
updatedAppoinmentMail(email:string, date:string, time:string, token : string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/user/updateAppoinment`;
  return this.http.get(`${this.path}?email=${email}&date=${date}&time=${time}`, {headers:headers})
}

}
