import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ClinicHistoryService } from 'src/app/clinicHistory/services/clinicHistory.service';
import { findUser } from 'src/app/odontogram/interfaces/findUser';
import { OdontogramService } from 'src/app/odontogram/services/odontogram.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { RolesService } from 'src/app/shared/services/roles/roles.service';

@Component({
  selector: 'app-table-registers-odontogram',
  templateUrl: './table-registers-odontogram.component.html',
  styleUrls: ['./table-registers-odontogram.component.css']
})
export class TableRegistersOdontogramComponent implements OnInit {
  @Input() tableProps: any;
  public registers: any[] = [];
  public roles: any[] = [];
  useremail : string = '';
  rolename : string = '';
  idOdontogram : string = '';
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;
  pacientes = [];
  public idUserTemp = [];
  userId: string = '';
  clinicHistoryId: string = '';
  private clinicHistoryIdTemp:any[] = [];
  public birth: Date;
  constructor(
    private _AlertsService: AlertsService,
    public dialog: MatDialog,
    private _RolesService : RolesService,
    private _OdontogramService : OdontogramService,
    private _ClinicHistoryService : ClinicHistoryService
  ) { }

  ngOnInit() {
    this.getUsersWithRole('Paciente');
    // this.getOdontogramRegisters();
    this.filteredValue();
  }
  filteredValue() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.id),
        map(name => name ? this._filter(name) : this.pacientes.slice())
      );
  }

  displayFn2(options: findUser[]): (id: string) => string {
    return (id: string) => {
      const correspondingOption = Array.isArray(options) ? options.find(option => option.id === id) : null;
      this.idUserTemp.push(correspondingOption);
      return correspondingOption ? correspondingOption.fullName : '';
    }
  }
  saveIdUser() {
    this.userId = this.idUserTemp[1].id
    // this.saveLocalStorage('userId', this.userId)
  }

  private _filter(name: string): findUser[] {
    const filterValue = name.toLowerCase();
    return this.pacientes.filter(option => option.fullName.toLowerCase().includes(filterValue));
  }

  acceptRequest(id:string){
    this.openModal(id);
  }

  cancelRequest(id:string){
    let token = JSON.parse(localStorage.getItem("Token"));
    this._AlertsService.confirmAlert(`¿ Seguro que desea eliminar este registro ?`,'','Confirmar','Cancelar')
    .then((res:any)=>{
      if(res.isConfirmed){
        this._OdontogramService.deleteOdontogram(id, token)
        .subscribe((res:any)=>{
        window.location.reload()
        })
      }
    })
    
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
          this.pacientes.push(objPacientes)
        })    
   
  })
}
getOdontogramWithUser(){
  let token = JSON.parse(localStorage.getItem("Token"));
  this._OdontogramService.getOdontogramIdUser(this.idUserTemp[1].id, token)
  .subscribe((res:any)=>{
      res.map((i:any) =>{
        let obj = {
          id: i.id,
          date_register: i.date_register,
          observation: i.observation
        }
        this.registers.push(obj)
        console.log(this.registers)
      })    
})
}

// getOdontogramRegisters(){
//   this._OdontogramService.getOdontograms()
//   .subscribe((res:any)=>{
//     this.registers.push(res)
//       console.log(this.registers)
//     res.map((i:any) =>{
//       let obj = {
//         id: i.id,
//         date_register: i.date_register,
//         observation: i.observation
//       }
//       this.registers.push(obj)
//       console.log(this.registers)
//     })    
// })
// }
getClinicHistoryIdUser(){
  let token = JSON.parse(localStorage.getItem("Token"));
  this._ClinicHistoryService.getClinicHistoryIdUser(this.idUserTemp[1].id, token)
  .subscribe((res:any)=>{
        this.clinicHistoryIdTemp.push(res.id) 
       this.clinicHistoryId = this.clinicHistoryIdTemp.toString();
  })
}

  openModal(id:string):void{
    this.idOdontogram = id
    // this.clinicHistoryId = idclinicHistory;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let customWidth:string;

    if(window.innerWidth <= 600){
      customWidth='100%';
    }else{
      customWidth='50%';
    }  

    dialogConfig.width = customWidth;
    dialogConfig.data = {
      title: 'Editar la observación de un odontograma',
      Modal: 'odontogramRegister',
    }

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res =>{
      if(typeof res != 'undefined'){
        let token = JSON.parse(localStorage.getItem("Token"));
        let obj = {
          observation: res.data.observation,
          UserId: this.userId,
          clinicHistoryId: this.clinicHistoryId,
        }
        this._OdontogramService.updateOdontogram(obj,this.idOdontogram, token)
            .subscribe(data => {
              this._AlertsService.successAlert(`¡Se actualizo el registro con exito!`, `Aceptar`,)
              .then((res:any) =>{
                if(res.isConfirmed){
                  window.location.reload()
                }
              })
          }, err => {
              500
              this._AlertsService.warningAlert(`Ocurrio un error inesperado, comuniquese con el admnistrador`, `Error`, `Aceptar`)
              406
              this._AlertsService.warningAlert(`No se encontro el registro de odontograma para el usuario \n comuniquese con el administrador`, `Error` ,`Aceptar`) 
              400
              this._AlertsService.warningAlert(`No se pudo guardar los cambios en el Odontograma \n comuniquese con el administrador`, `Error` ,`Aceptar`) 
          })
        }
        // console.log(res);   
      })
  }

}
