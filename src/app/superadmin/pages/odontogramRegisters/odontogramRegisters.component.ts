import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { RolesService } from 'src/app/shared/services/roles/roles.service';


@Component({
  selector: 'app-odontogramRegisters',
  templateUrl: './odontogramRegisters.component.html',
  styleUrls: ['./odontogramRegisters.component.css']
})
export class OdontogramRegistersComponent implements OnInit {
  public tableProps = {
    // title: 'Registros',
    firstColum: 'Id',
    secondColum: 'Fecha',
    thirdColum: 'Observación',
    fourthColum: 'Acciones',
    firstBottom: 'Actualizar',
    secondBottom: 'Eliminar'
  }
  public users: any[] = [];
  constructor(
    private _AlertsService: AlertsService,
    public dialog: MatDialog,
    private _RolesService : RolesService,
  ) { }

  ngOnInit() {
  }
  getUsersWithRole(rolName:string){
    let token = JSON.parse(localStorage.getItem("Token"));
    this._RolesService.getUsersOfRole(rolName, token)
    .subscribe((res:any)=>{
        res.map((i:any) =>{
          let objPacientes = {
            id: i.id,
            fullName: i.fullName,
            email: i.email,
            username: i.userName
          }
          this.users.push(objPacientes)
        })       
  })
}

}
