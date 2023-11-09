import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { RolesService } from 'src/app/shared/services/roles/roles.service';

@Component({
  selector: 'app-historyClinicRegisters',
  templateUrl: './historyClinicRegisters.component.html',
  styleUrls: ['./historyClinicRegisters.component.css']
})
export class HistoryClinicRegistersComponent implements OnInit {
  public tableProps = {
    // title: 'Registros',
    firstColum: 'Email',
    secondColum: 'Usuario',
    thirdColum: 'Nombre Completo',
    fourthColum: 'Acciones',
    firstBottom: 'Descargar',
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

}
