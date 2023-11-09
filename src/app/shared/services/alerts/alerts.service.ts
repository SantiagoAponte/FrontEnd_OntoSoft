import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() {
   }

  infoAlert(text:string, title:string=null):any{
   return Swal.fire({
      icon: 'info',
      title: title,
      text: text,
      allowOutsideClick: false,
    });
  }

  errorAlert(text:string, title:string=null):any{
    return Swal.fire({
       icon: 'error',
       title: title,
       text: text,
       allowOutsideClick: false,
     });
   }
   successAlertOdontogram(text:string, title:string=null):any{
    return Swal.fire({
       icon: 'success',
       title: title,
       text: text,
       allowOutsideClick: false,
       confirmButtonColor: '#3085d6',
     }).then(function(){
       window.location.replace('/odontogram')
     });
   }
   successAlert(text:string, title:string=null):any{
    return Swal.fire({
       icon: 'success',
       title: title,
       text: text,
       allowOutsideClick: false,
       confirmButtonColor: '#3085d6',
     })
   }

  warningAlert(text:string, title:string=null, btnAcept:string, /*btnCancel:string*/){
    return Swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      confirmButtonText: btnAcept,
    //   cancelButtonText: btnCancel,
      confirmButtonColor: '#d33',
    //   cancelButtonColor: '#d33',
      allowOutsideClick: false,
    });
  }

  deleteAlert(text:string,title:string=null){
  return Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Salir',
    confirmButtonColor: '#C31A1A',
    cancelButtonText: 'Cancelar',
    cancelButtonColor:'#0087FF',
    reverseButtons: true
  })}
  
  confirmAlert(text:string, title:string=null, btnAcept:string, btnCancel:string){
    return Swal.fire({
      icon: 'info',
      title: title,
      text: text,
      confirmButtonText: btnAcept,
      cancelButtonText: btnCancel,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      allowOutsideClick: false,
    });
  }
}