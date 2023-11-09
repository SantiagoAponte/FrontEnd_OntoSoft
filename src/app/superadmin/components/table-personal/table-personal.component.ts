import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { RolesService } from 'src/app/shared/services/roles/roles.service';
import { MailServiceService } from 'src/app/shared/services/sendMails/mailService.service';

@Component({
  selector: 'app-table-personal',
  templateUrl: './table-personal.component.html',
  styleUrls: ['./table-personal.component.css']
})
export class TablePersonalComponent implements OnInit {
  @Input() tableProps: any;
  public users: any[] = [];
  public roles: any[] = [];
  useremail : string = '';
  rolename : string = '';
  iduser : string = '';

  constructor(
    private _AlertsService: AlertsService,
    public dialog: MatDialog,
    private _RolesService : RolesService,
    private _MailServiceService :  MailServiceService
  ) { }

  ngOnInit() {
    this.getUsersWithRole('default');
  }

  acceptRequest(id:string, user:string){
    this.openModal(id,user);
  }

  cancelRequest(id:string,user:string){
    let token = JSON.parse(localStorage.getItem("Token"));
    this._AlertsService.confirmAlert(`¿ Seguro que desea cancelar el acceso al usuario ${user} ?`,'','Confirmar','Cancelar')
    .then((res:any)=>{
      if(res.isConfirmed){
        this._RolesService.deleteUser(id, token)
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
      if(rolName == "default"){
        res.map((i:any) =>{
          let objPacientes = {
            id: i.id,
            fullName: i.fullName,
            email: i.email,
            username: i.userName
          }
          this.users.push(objPacientes)
        }) 
        
      } 
  })
}

  openModal(id:string,user:string):void{
    this.iduser = id;
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
      title: 'Aceptar nuevo usuario',
      Modal: 'newUser',
      user: user
    }

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res =>{
      if(typeof res != 'undefined'){
        let token = JSON.parse(localStorage.getItem("Token"));
        res.data.idUser = this.iduser;
        let obj = {
          Id: res.data.idUser,
          Email: res.data.email,
          RolName: res.data.rolname,
        }
        this._RolesService.PostUserRol(obj, token)
            .subscribe(data => {
              this._AlertsService.successAlert(`¡Se asigno el rol con exito!`, `Aceptar`,)
              .then((res:any) =>{
                if(res.isConfirmed){
                  this._MailServiceService.activatedUser(obj.Email, token)
                   .subscribe((response : any)=>{
                  })
                  window.location.reload()
                }
              })
          }, err => {
              500
              this._AlertsService.warningAlert(`Ocurrio un error inesperado, comuniquese con el admnistrador`, `Error`, `Aceptar`)
              406
              this._AlertsService.warningAlert(`No se encontro al usuario para asignarle el rol \n comuniquese con el administrador`, `Error` ,`Aceptar`) 
              406
              this._AlertsService.warningAlert(`No se pudo asignar el rol al usuario \n Verifique la informaciòn que esta ingresando`, `Error` ,`Aceptar`) 
              
          })
        }
        // console.log(res);   
      })
  }

}
