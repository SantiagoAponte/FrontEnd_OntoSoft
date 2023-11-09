import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { taskGetUserDetails } from 'src/app/clinicHistory/interfaces/taskGetUserDetails';
import { taskPutUserDetails } from 'src/app/clinicHistory/interfaces/taskPutUserDetails';
import { ClinicHistoryService } from 'src/app/clinicHistory/services/clinicHistory.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { RolesService } from 'src/app/shared/services/roles/roles.service';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css']
})
export class TableUserComponent implements OnInit {
  private dialogConfig = new MatDialogConfig();
  @Input() tableProps: any;
  public users: any[] = [];
  public roles: any[] = [];
  useremail : string = '';
  rolename : string = '';
  iduser : string = '';
  public rol: string = '';
  private rolTemp:any[] = [];
  public detailsUser = [];
  public imagenDashboard:string = '';
  constructor(
    private _AlertsService: AlertsService,
    public dialog: MatDialog,
    private _RolesService : RolesService,
    private _ClinicHistoryService : ClinicHistoryService
  ) { }

  ngOnInit():void {
    this.getUsers();
  }

  // ngAfterContentInit(){
  //   setTimeout(()=>{
  //     this._RolesService.getRolUser(this.iduser)
  // .subscribe((res:any)=>{
  //   this.rolTemp.push(res);
  //   this.rol = this.rolTemp.toString(); 
  //   console.log(this.rol)    
  //   })
  //   },0)
  // }

  // getRol(){
  //   this._RolesService.getRolUser(this.iduser)
  //   .subscribe((res:any)=>{
  //     this.rolTemp.push(res);
  //     this.rol = this.rolTemp.toString(); 
  //     console.log(this.rol)    
  //     })
  // }

  getUsers(){
    let token = JSON.parse(localStorage.getItem("Token"));
    this._RolesService.getAllUsers(token)
    .subscribe((res:any)=>{
      this.users.push(res);     
  })
}

  acceptRequest(id:string, user:string){
    this.getDetailsIdUser(id);
    setTimeout(()=>{
    this.openModal(id,user);
    },800)
  }

  cancelRequest(id:string,user:string){
    let token = JSON.parse(localStorage.getItem("Token"));
    this._AlertsService.confirmAlert(`¿ Seguro que desea eliminar al usuario ${user} ?`,'','Confirmar','Cancelar')
    .then((res:any)=>{
      if(res.isConfirmed){
        this._RolesService.deleteUser(id, token)
        .subscribe((res:any)=>{
        window.location.reload()
        })
      }
    })
    
  }
  getDetailsIdUser(id:string) {
    let token = JSON.parse(localStorage.getItem("Token"));
    this._ClinicHistoryService.getDetailsIdUser(id,token)
      .subscribe((res: any) => {
        let response: taskGetUserDetails = {
          email: res.email,
          fullName: res.fullName,
          username: res.username,
          phoneNumber: res.phoneNumber,
          phoneEmergency: res.phoneEmergency,
          contactEmergency: res.contactEmergency,
          addresContact: res.addresContact,
          centerEmergency: res.centerEmergency,
          eps: res.eps,
          dateBirth: res.dateBirth,
          city: res.city,
          address: res.address,
          gender: res.gender,
          document: res.document,
          height: res.height,
          weight: res.weight,
          rh: res.rh,
          bloodType: res.bloodType,
          typeDocumentId: res.typeDocumentId,
          imagenPerfil: res.imagenPerfil.data
        }
        this.detailsUser.push(response); 
      })
  }

  openModal(id:string,user:string):void{
    this.iduser = id;
    // let date :  Date = this.detailsUser[0].dateBirth;
    // let info = date.toISOString().slice(0, 10)
    //  console.log(info);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let customWidth:string;
    // this.imagenDashboard = 'data:image/' + this.detailsUser[0].imagenPerfil.extension + ';base64,' + this.detailsUser[0].imagenPerfil.data
    if(window.innerWidth <= 600){
      customWidth='100%';
    }else{
      customWidth='50%';
    }  
    let date : string = '';
    date = this.detailsUser[0].dateBirth
    let info = date.substring(0,10);

    dialogConfig.width = customWidth;
    dialogConfig.data = {
      title: 'Información del usuario',
      Modal: 'listUsersRegister',
      iduser: id,
      user: user,
      fullName: this.detailsUser[0].fullName,
      email: this.detailsUser[0].email,
      username: this.detailsUser[0].username,
      phoneNumber: this.detailsUser[0].phoneNumber,
      phoneEmergency: this.detailsUser[0].phoneEmergency,
      contactEmergency: this.detailsUser[0].contactEmergency,
      addresContact: this.detailsUser[0].addresContact,
      centerEmergency: this.detailsUser[0].centerEmergency,
      eps: this.detailsUser[0].eps,
      dateBirth: info,
      city: this.detailsUser[0].city,
      address: this.detailsUser[0].address,
      gender: this.detailsUser[0].gender,
      document: this.detailsUser[0].document,
      height: this.detailsUser[0].height,
      weight: this.detailsUser[0].weight,
      rh: this.detailsUser[0].rh,
      bloodType: this.detailsUser[0].bloodType,
      typeDocumentId: this.detailsUser[0].typeDocumentId,
      // image: this.imagenDashboard,
    }
    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res =>{
      if(typeof res != 'undefined'){
        let token = JSON.parse(localStorage.getItem("Token"));
        let dataImageBase64 = JSON.parse(localStorage.getItem("dataBase64"));
        let extension = JSON.parse(localStorage.getItem("name"));
        let name = JSON.parse(localStorage.getItem("type"));
        res.data.idUser = this.iduser;
        let obj : taskPutUserDetails = {
          fullName: res.data.fullName,
          email: res.data.Email,
          username: res.data.UserName,
          phoneNumber: res.data.PhoneNumber,
          phoneEmergency: res.data.phoneEmergency,
          contactEmergency: res.data.contactEmergency,
          addresContact: res.data.addresContact,
          centerEmergency: res.data.centerEmergency,
          eps: res.data.eps,
          dateBirth: res.data.dateBirth,
          city: res.data.city,
          address: res.data.address,
          gender: res.data.gender,
          document: res.data.document,
          height: res.data.height,
          weight: res.data.weight,
          rh: res.data.rh,
          bloodType: res.data.bloodType,
          typeDocumentId: [res.data.typeDocumentId],
          imagenPerfil: {
            Data: dataImageBase64[1],
            Name: extension,
            Extension: name
          }
        }
        setTimeout(()=>{
        this._RolesService.putUser(id,obj, token)
            .subscribe(data => {
              200
              this._AlertsService.successAlert(`¡Se actualizo la información del usuario con éxito!`, `Aceptar`,)
              .then((res:any) =>{
                if(res.isConfirmed){
                  localStorage.removeItem('dataBase64');
                  localStorage.removeItem('name');
                  localStorage.removeItem('type');
                  window.location.reload()
                }
          })
        }, err => {
           
              500
              this._AlertsService.warningAlert(`Ocurrio un error inesperado, comuniquese con el admnistrador`, `Error`, `Aceptar`)
              406
              this._AlertsService.warningAlert(`No existe un usuario con este username`, `Error` ,`Aceptar`) 
              406
              this._AlertsService.warningAlert(`Este email o username pertenece a otro usuario`, `Error` ,`Aceptar`)
              400
              this._AlertsService.warningAlert(`Error, no se pudo actualizar la información del usuario`, `Error` ,`Aceptar`)
              
          })
        },200)
        }
      })
  }
}
