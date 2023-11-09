import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { taskPost } from '../interfaces/appoinments/taskPost';
import { Guid } from "guid-typescript";
import { taskGetIdUser } from '../interfaces/appoinments/taskGetIdUser';
import { taskGetAll } from '../interfaces/appoinments/taskGetAll';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

   path = '';
   api = 'https://ontosoft.herokuapp.com/api';
   tempApi = 'http://localhost:5000/api';
   
  constructor(
      private http: HttpClient
      ) {}
      
    getAllAppoinments(token : string){
      const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
        this.path = `${this.api}/appoinments`;
        return this.http.get<taskGetAll[]>(this.path,{headers:headers});
    }

    getAppoinmentIdCita(id: string,token : string){
      const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
        this.path = `${this.api}/appoinments/${id}`;
        return this.http.get<taskGetAll>(this.path,{headers:headers});
    }

    getAppoinmentIdUser(Userid:string){
        this.path = `${this.api}/appoinments/users/${Userid}`;
        return this.http.get<taskGetIdUser>(this.path);
    }

    PostAppoinment(data: taskPost,token : string){
      const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
        this.path = `${this.api}/appoinments/add`;
        return this.http.post(this.path,data,{headers:headers});
    }

    updateAppoinment(data: taskPost, id:string, token : string) {
      const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
        this.path = `${this.api}/appoinments/edit/${id}`;
        return this.http.put<Task>(this.path, data, {headers:headers});
      }

    deleteAppoinment(id: string, token : string) {
      const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
        this.path = `${this.api}/appoinments/delete/${id}`;
        return this.http.delete(this.path, {headers:headers});
    }

  }