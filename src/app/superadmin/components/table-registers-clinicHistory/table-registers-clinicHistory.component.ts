import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClinicHistoryService } from 'src/app/clinicHistory/services/clinicHistory.service';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { RolesService } from 'src/app/shared/services/roles/roles.service';

@Component({
  selector: 'app-table-registers-clinicHistory',
  templateUrl: './table-registers-clinicHistory.component.html',
  styleUrls: ['./table-registers-clinicHistory.component.css']
})
export class TableRegistersClinicHistoryComponent implements OnInit {
  @Input() tableProps: any;
  public users: any[] = [];
  public roles: any[] = [];
  useremail : string = '';
  rolename : string = '';
  iduser : string = '';
  clinicHistoryId: string = '';
  private clinicHistoryIdTemp:any[] = [];
  constructor(
    private _AlertsService: AlertsService,
    public dialog: MatDialog,
    private _RolesService : RolesService,
    private _ClinicHistoryService : ClinicHistoryService,
  ) { }

  ngOnInit() {
    this.getUsers();
  }
  acceptRequest(id:string){
    this.iduser = id;
        this._ClinicHistoryService.getPdfIdUser(id)
        .subscribe((res:any)=>{
      }, err => {
        if(err.status === 200){
          window.open(`https://ontosoft.herokuapp.com/api/clinichistory/exportpdf/${id}`);
          this._AlertsService.successAlert(`¡Se genero el PDF con exito!`, `Aceptar`,)
          .then((res:any)=>{
            if(res.isConfirmed){
              window.location.reload();
            }
          })
        }
        else {
          this._AlertsService.warningAlert(`Es posible que el usuario no tenga una historia clinica creada o un registro de odontograma`, `Error`, `Aceptar`)         
          .then((res:any)=>{
            if(res.isConfirmed){
              window.location.reload();
            }
          })
        }
      })
    }
      
  cancelRequest(id:string,user:string){
    let token = JSON.parse(localStorage.getItem("Token"));
    this._AlertsService.confirmAlert(`¿ Seguro que desea eliminar la historia clinica del usuario ${user} ?`,'','Confirmar','Cancelar')
    .then((res:any)=>{
      if(res.isConfirmed){
        let obj = {
          IdPatient : "DE3A37B7-C280-40C2-8C22-1E1B96CB9DB2",
          IdRadiography : "B0B821B3-F889-4B4C-A34F-32AB47518D96",
          IdTreamentPlan : "5708766C-F8C8-4962-AE29-5326DA552D18"
        }
        this._ClinicHistoryService.deleteClinicHistory(obj,this.clinicHistoryId, token)
        .subscribe((res:any)=>{
        window.location.reload()
        } , err => {
          this._AlertsService.warningAlert(`Es posible que el usuario no tenga una historia clinica para eliminar`, `Error`, `Aceptar`)         
          .then((res:any)=>{
            if(res.isConfirmed){
              window.location.reload();
            }
          })
        })
      }
    })
    
  }

  getUsers(){
    let token = JSON.parse(localStorage.getItem("Token"));
    this._RolesService.getAllUsers(token)
    .subscribe((res:any)=>{
      this.users.push(res);       
  })
}

getClinicHistoryIdUser(){
  let token = JSON.parse(localStorage.getItem("Token"));
  this._ClinicHistoryService.getClinicHistoryIdUser(this.iduser, token)
  .subscribe((res:any)=>{
        this.clinicHistoryIdTemp.push(res) 
  })
}

}
