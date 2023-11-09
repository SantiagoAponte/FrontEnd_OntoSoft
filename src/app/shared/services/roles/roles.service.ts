import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { taskPutUserInSession } from 'src/app/clinicHistory/interfaces/putUserInSession';
import { taskGetUserDetails } from 'src/app/clinicHistory/interfaces/taskGetUserDetails';
import { taskPutUserDetails } from 'src/app/clinicHistory/interfaces/taskPutUserDetails';
import { taskDeleteRol } from '../../components/calendar/interfaces/roles/taskDeleteRol';
import { taskGetAllRoles } from '../../components/calendar/interfaces/roles/taskGetAllRoles';
import { taskGetAllUsers } from '../../components/calendar/interfaces/roles/taskGetAllUsers';
import { taskgetUserRol } from '../../components/calendar/interfaces/roles/taskgetUserRol';
import { taskPostAddRol } from '../../components/calendar/interfaces/roles/taskPostAddRol';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  path = '';
  api = 'https://ontosoft.herokuapp.com/api';
  tempApi = 'http://localhost:5000/api';

constructor(
  private http: HttpClient
) { }
PostUserRol(data: taskPostAddRol, token:string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/rol/adduserrol`;
  return this.http.post(this.path,data, {headers:headers});
}
PostRol(data: taskDeleteRol, token:string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/rol/addrol`;
  return this.http.post(this.path,data, {headers:headers});
}
getUsersOfRole(rolName:string, token:string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/rol/user/${rolName}`;
  return this.http.get<[taskgetUserRol]>(this.path, {headers:headers});
}
getRoles(token:string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/rol/listroles`;
  return this.http.get<[taskGetAllRoles]>(this.path, {headers:headers});
}
deleteRol(data:taskDeleteRol, token:string) {
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/rol/deleterol`;
  return this.http.post(this.path, data, {headers:headers});
}
deleteRolOfUser(data:taskPostAddRol, token:string) {
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/rol/deleteroleuser`;
  return this.http.post(this.path, data, {headers:headers});
}
getRolUser(id:string, token:string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/rol/rolofuser/${id}`;
  return this.http.get<[]>(this.path,{headers:headers});
}
getAllUsers(token:string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/user/allusers`;
  return this.http.get<[taskGetAllUsers]>(this.path, {headers:headers});
}
deleteUser(id: string, token:string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/user/delete/${id}`;
  return this.http.delete(this.path, {headers:headers});
}
putUser(id: string, data:taskPutUserDetails, token:string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/user/edit/${id}`;
  return this.http.put(this.path,data, {headers:headers});
}
putUserInSession(data:taskPutUserInSession,token : string){
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  this.path = `${this.api}/user/edit`;
    return this.http.put(this.path,data,{headers:headers})
}

}
