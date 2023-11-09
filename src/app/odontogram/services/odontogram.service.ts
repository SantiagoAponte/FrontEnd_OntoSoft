import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { taskGetFaceTooths } from '../interfaces/taskGetFaceTooths';
import { taskGetOdontogramIdUser } from '../interfaces/taskGetOdontogramIdUser';
import { taskGetOdontograms } from '../interfaces/taskGetOdontograms';
import { taskGetTooths } from '../interfaces/taskGetTooths';
import { taskGetTypeProcess } from '../interfaces/taskGetTypeProcess';
import { taskPostandUpdate } from '../interfaces/taskPostandUpdate';

@Injectable({
  providedIn: 'root'
})
export class OdontogramService{
  path = '';
  api = 'https://ontosoft.herokuapp.com/api';
  tempApi = 'http://localhost:5000/api';
  
constructor(
  private http: HttpClient
) { }
getTooths(token : string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/odontogram/tooths`;
  return this.http.get<[taskGetTooths]>(this.path,{headers:headers});
}
getTypeProcess(token : string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/odontogram/typeprocess`;
  return this.http.get<[taskGetTypeProcess]>(this.path,{headers:headers});
}
getFaceTooths(token : string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/odontogram/facetooths`;
  return this.http.get<[taskGetFaceTooths]>(this.path,{headers:headers});
}
getOdontograms(token : string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/odontogram`;
  return this.http.get<[taskGetOdontograms]>(this.path,{headers:headers});
}

getOdontogramIdUser(Userid:string, token : string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/odontogram/users/${Userid}`;
  return this.http.get<[taskGetOdontogramIdUser]>(this.path,{headers:headers});
}

PostOdontogram(data: taskPostandUpdate, token : string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/odontogram/addodontogram`;
  return this.http.post(this.path,data,{headers:headers});
}

updateOdontogram(data: taskPostandUpdate, id:string, token : string) {
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/odontogram/edit/${id}`;
  return this.http.put<Task>(this.path, data,{headers:headers});
}

deleteOdontogram(id: string, token : string) {
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/odontogram/delete/${id}`;
  return this.http.delete(this.path,{headers:headers});
}
}
