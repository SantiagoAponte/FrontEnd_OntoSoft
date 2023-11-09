import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { deleteClinicHistory } from '../interfaces/deleteClinicHistory';
import { PostClinicHistory } from '../interfaces/postClinicHistory';
import { PostOralRadiography } from '../interfaces/postOralRadiography';
import { PostPatientEvolution } from '../interfaces/postPatientEvolution';
import { postTreamentPlan } from '../interfaces/postTreamentPlan';
import { PutClinicHistory } from '../interfaces/putClinicHistory';
import { taskGetAllBackgroundMedicals } from '../interfaces/taskGetAllBackgroundMedicals';
import { taskGetClinicHistoryIdUser } from '../interfaces/taskGetClinicHistoryIdUser';
import { taskGetUserDetails } from '../interfaces/taskGetUserDetails';

@Injectable({
  providedIn: 'root'
})
export class ClinicHistoryService {
  path = '';
  api = 'https://ontosoft.herokuapp.com/api';
  tempApi = 'http://localhost:5000/api';
constructor(private http: HttpClient) { }

getClinicHistoryIdUser(Userid:any, token : string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/clinichistory/users/${Userid}`;
  return this.http.get<[taskGetClinicHistoryIdUser]>(this.path,{headers:headers});
}
getDetailsIdUser(Userid:string, token : string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/user/details/${Userid}`;
  return this.http.get<[taskGetUserDetails]>(this.path,{headers:headers});
}
getSessionUser(token : string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/user`;
  return this.http.get(this.path,{headers:headers})
}

getBackgroundsMedical(token : string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/clinichistory/backgroundmedical`;
  return this.http.get<[taskGetAllBackgroundMedicals]>(this.path,{headers:headers});
}
getBackgroundsOral(token : string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/clinichistory/backgroundoral`;
  return this.http.get<[taskGetAllBackgroundMedicals]>(this.path,{headers:headers});
}
getPdfIdUser(Userid:string){
  this.path = `${this.api}/clinichistory/exportpdf/${Userid}`;
  return this.http.get(this.path);
}
PostClinicHistory(data:PostClinicHistory,token : string ){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/clinichistory/addclinichistory`;
  return this.http.post(this.path,data,{headers:headers});
}
PutClinicHistory(data:PutClinicHistory , idClinicHistory:string, token : string) {
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/clinichistory/edit/${idClinicHistory}`;
  return this.http.put<Task>(this.path, data,{headers:headers});
}
deleteClinicHistory(data:deleteClinicHistory, idClinicHistory: string, token : string) {
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/clinichistory/${idClinicHistory}`;
  return this.http.post(this.path, data,{headers:headers});
}
PostPatientEvolution(data: PostPatientEvolution, token : string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/clinichistory/addevolution`;
  return this.http.post(this.path,data,{headers:headers});
}
PostOralRadiography(data:PostOralRadiography, token : string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/clinichistory/addradiography`;
  return this.http.post(this.path,data,{headers:headers});
}
PostTreamentPlan(data:postTreamentPlan, token : string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/clinichistory/addtreamentplan`;
  return this.http.post(this.path,data,{headers:headers});
}


}
