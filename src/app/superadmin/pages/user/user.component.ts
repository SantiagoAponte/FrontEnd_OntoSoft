import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { taskGetUserDetails } from 'src/app/clinicHistory/interfaces/taskGetUserDetails';
import { ClinicHistoryService } from 'src/app/clinicHistory/services/clinicHistory.service';
import * as _ from 'lodash';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { RolesService } from 'src/app/shared/services/roles/roles.service';
import { taskPutUserInSession } from 'src/app/clinicHistory/interfaces/putUserInSession';
@Component({
    selector: 'user-cmp',
    // moduleId: module.id,
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})


export class UserComponent implements OnInit{
    public detailsUser = [];
    profileUser: FormGroup;
    public cardImageBase64: string;
    public imagenDashboard : string;
    imageError: string;
    isImageSaved: boolean;
    typeImage: string = '';
    public info : string = '';
    public template : string = 'assets/img/insert-imagen.png';
    public tipoDocumentos: Array<any> = [
      {id: '1C6F9914-535F-4686-92EC-93AACF89CCA8', name: 'Tarjeta de Identidad'},
      {id: '2F3D1BF6-4513-408A-83E5-91B5A5A04F92', name: 'Cedula de Extranjeria'},
      {id: 'C71DAF1B-D4B1-406D-9765-E46DC3D5817F', name: 'Pasaporte'},
      {id: 'E2AA60DE-722C-48A8-BE19-B042871F399A', name: 'Numero de Identificacion personal'},
      {id: 'FBD9D178-6915-4523-ACF3-3C2FC4C36739', name: 'Cedula de Ciudadania'},
      {id: 'FDB4977C-FAD8-4291-A8B0-7E2EBE433CF9', name: 'Numero de Identificacion tributaria'}
    ]
  fullName : string = '';
  email: string = '';
   username: string = '';
   phoneNumber: string = '';
   phoneEmergency: string = '';
   contactEmergency: string = '';
   addresContact: string = '';
   centerEmergency: string = '';
   eps: string = '';
   dateBirth: string = '';
   city: string = '';
   address: string = '';
   gender: string = '';
   document: string = '';
   height: string = '';
   weight: string = '';
   rh: string = '';
   bloodType: string = '';
   typeDocumentId: string = '';
   public initForm: boolean = false;
   typeForm: string = '';

   dataTemp: string = '';
   nameTemp: string = '';
   extensionTemp: string = '';

   data2Temp: string = '';
   name2Temp: string = '';
   extension2Temp: string = '';

    constructor( private _ClinicHistoryService : ClinicHistoryService,
      private _AlertsService: AlertsService,
      private _RolesService : RolesService,

        // private _snackBar: MatSnackBar,
        ) {
            this.profileUser = this.FormDefault();
            // this.profileUser = this.FormListUsers(); 
        }
        FormDefault(){
          return new FormGroup({});
        }

    FormListUsers(){
      let date : string = '';
      date = this.detailsUser[0].dateBirth
      let info = date.substring(0,10);
      this.fullName = this.detailsUser[0].fullName
      this.email = this.detailsUser[0].email,
      this.username = this.detailsUser[0].username,
      this.phoneNumber = this.detailsUser[0].phoneNumber,
      this.phoneEmergency = this.detailsUser[0].phoneEmergency,
      this.contactEmergency = this.detailsUser[0].contactEmergency,
      this.addresContact = this.detailsUser[0].addresContact,
      this.centerEmergency = this.detailsUser[0].centerEmergency,
      this.eps = this.detailsUser[0].eps,
      this.dateBirth = info,
      this.city = this.detailsUser[0].city,
      this.address = this.detailsUser[0].address,
      this.gender = this.detailsUser[0].gender,
      this.document = this.detailsUser[0].document,
      this.height = this.detailsUser[0].height,
      this.weight = this.detailsUser[0].weight,
      this.rh = this.detailsUser[0].rh,
      this.bloodType = this.detailsUser[0].bloodType,
      this.typeDocumentId = this.detailsUser[0].typeDocumentId
            return new FormGroup({
              fullName: new FormControl(this.fullName),
              UserName: new FormControl(this.username,[Validators.required]),
              Email: new FormControl(this.email,[Validators.required] ),
              // PasswordHash: new FormControl('',[Validators.required] ),
              PhoneNumber: new FormControl(this.phoneNumber,[Validators.required] ),
              phoneEmergency: new FormControl(this.phoneEmergency,[Validators.required] ),
              contactEmergency: new FormControl(this.contactEmergency,[Validators.required] ),
              addresContact: new FormControl(this.addresContact,[Validators.required] ),
              eps: new FormControl(this.eps,[Validators.required] ),
              dateBirth: new FormControl(info,[Validators.required] ),
              city: new FormControl(this.city,[Validators.required] ),
              address: new FormControl(this.address,[Validators.required] ),
              gender: new FormControl(this.gender,[Validators.required] ),
              document: new FormControl(this.document,[Validators.required] ),
              height: new FormControl(this.height,[Validators.required] ),
              weight: new FormControl(this.weight,[Validators.required] ),
              rh: new FormControl(this.rh,[Validators.required] ),
              bloodType: new FormControl(this.bloodType,[Validators.required] ),
              typeDocumentId: new FormControl(this.typeDocumentId,[Validators.required] ),
              centerEmergency: new FormControl(this.centerEmergency,[Validators.required] ),
              imagenPerfil: new FormControl(),
            });
          }
        
    ngOnInit() :  void {
      this.getUserSession();
      setTimeout(()=>{
      if(this.typeForm != 'activated'){
        this.initForm = true;
        this.profileUser = this.FormListUsers();
      }
    },800)
    }
    getUserSession(){
      let token = JSON.parse(localStorage.getItem("Token"));
      this._ClinicHistoryService.getSessionUser(token)
      .subscribe((res: any) => {
        this.dataTemp = res.imagenPerfil.data;
        this.nameTemp = res.imagenPerfil.name;
        this.extensionTemp = res.imagenPerfil.extension;
        this.imagenDashboard = 'data:image/' + res.imagenPerfil.extension + ';base64,' + res.imagenPerfil.data
        setTimeout(()=>{
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
      },0)
      })
    }

    PutUserSession(){
      let token = JSON.parse(localStorage.getItem("Token"));
      
      let dataImageBase64 = JSON.parse(localStorage.getItem("dataBase64"));
      let name = JSON.parse(localStorage.getItem("name"));
      let extension = JSON.parse(localStorage.getItem("type"));

        let helper = new JwtHelperService(token);
       const decodedToken = helper.decodeToken(token);
      let user = { 
        Id : decodedToken.sub,
      }
        if (this.profileUser.valid) { 
          if(dataImageBase64 != null || name != null || extension != null){
            this.data2Temp = JSON.parse(localStorage.getItem("dataBase64"));
            this.name2Temp = JSON.parse(localStorage.getItem("name"));
            this.extension2Temp = JSON.parse(localStorage.getItem("type"));
          } 
          let obj : taskPutUserInSession = {
            Id: user.Id,
            fullName: this.profileUser.value.fullName,
            email: this.profileUser.value.Email,
            username: this.profileUser.value.UserName,
            phoneNumber: this.profileUser.value.PhoneNumber,
            phoneEmergency: this.profileUser.value.phoneEmergency,
            contactEmergency: this.profileUser.value.contactEmergency,
            addresContact: this.profileUser.value.addresContact,
            centerEmergency: this.profileUser.value.centerEmergency,
            eps: this.profileUser.value.eps,
            dateBirth: this.profileUser.value.dateBirth,
            city: this.profileUser.value.city,
            address: this.profileUser.value.address,
            gender: this.profileUser.value.gender,
            document: this.profileUser.value.document,
            height: this.profileUser.value.height,
            weight: this.profileUser.value.weight,
            rh: this.profileUser.value.rh,
            bloodType: this.profileUser.value.bloodType,
            typeDocumentId: [this.profileUser.value.typeDocumentId],
            imagenPerfil: {
              Data: this.data2Temp[1],
              Name: this.name2Temp,
              Extension: this.extension2Temp
            }
          }
          if(obj.imagenPerfil.Data == null ||obj.imagenPerfil.Name == null || obj.imagenPerfil.Extension == null){
            obj.imagenPerfil.Data = this.dataTemp;
            obj.imagenPerfil.Name = this.nameTemp;
            obj.imagenPerfil.Extension = this.extensionTemp;
          } 
          this._RolesService.putUserInSession(obj,token)
              .subscribe((response : any)=> {
                200
                this._AlertsService.successAlert(`¡Se actualizo la información del usuario con éxito!`, `Aceptar`,)
                .then((res:any) =>{
                  if(res.isConfirmed){
                    localStorage.removeItem('dataBase64');
                    localStorage.removeItem('name');
                    localStorage.removeItem('type');
                    if(response.code=200){
                      localStorage.setItem('Token',JSON.stringify(response.token));
                    }
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
      }
    }
    
    getHistoricClinicOfPdf(){
      let token = JSON.parse(localStorage.getItem("Token"));
    let helper = new JwtHelperService(token);
    const decodedToken = helper.decodeToken(token);
      let user = { 
        Id : decodedToken.sub,
      }
      this._ClinicHistoryService.getPdfIdUser(user.Id)
      .subscribe((res:any)=>{
    }, err => {
      if(err.status === 200){
        window.open(`https://ontosoft.herokuapp.com/api/clinichistory/exportpdf/${user.Id}`);
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

      fileChangeEvent(fileInput: any) {
      
        this.imageError = null;
        if (fileInput.target.files && fileInput.target.files[0]) {
            // Size Filter Bytes
            const max_size = 20971520;
            const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];
            const max_height = 15200;
            const max_width = 25600;
    
            if (fileInput.target.files[0].size > max_size) {
                this.imageError =
                    'El tamaño maximo por imagen es ' + max_size / 1000 + 'Mb';
    
                return false;
            }
    
            if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
               this._AlertsService.warningAlert(`Solo se permiten imagenes en formato ( JPG | PNG )`, `Error`, `Aceptar`)
                return false;
            } else if (fileInput.target.files[0].type === 'image/jpg'){
              this.typeImage = 'jpg'
            }else if (fileInput.target.files[0].type === 'image/jpeg'){
              this.typeImage = 'jpeg'
            }else if (fileInput.target.files[0].type === 'image/png'){
              this.typeImage = 'png'
            }
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                    const img_height = rs.currentTarget['height'];
                    const img_width = rs.currentTarget['width'];
    
                    if (img_height > max_height && img_width > max_width) {
                        this.imageError =
                            'Se alcanzo el maximo de la imagen ' +
                            max_height +
                            '*' +
                            max_width +
                            'px';
                            return false;
                    } else {
                        const imgBase64Path = e.target.result;
                        this.cardImageBase64 = imgBase64Path.split(",");
                        // this.cardImageBase64 = imgBase64Path;
                        localStorage.setItem("dataBase64", JSON.stringify(this.cardImageBase64));
                        localStorage.setItem("name", JSON.stringify(fileInput.target.files[0].name));
                        localStorage.setItem("type", JSON.stringify(this.typeImage));
                              
                        this.isImageSaved = true;      
                        return true
                        // this.previewImagePath = imgBase64Path;
                    }
                    
                };
            };
            reader.readAsDataURL(fileInput.target.files[0]);
        }
        return ''
    }
    
    removeImage() {
        this.cardImageBase64 = null;
        this.isImageSaved = false;
        localStorage.removeItem('dataBase64');
        localStorage.removeItem('name');
        localStorage.removeItem('type');
    }
}
