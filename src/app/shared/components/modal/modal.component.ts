import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { taskGetUserDetails } from 'src/app/clinicHistory/interfaces/taskGetUserDetails';
import { ClinicHistoryService } from 'src/app/clinicHistory/services/clinicHistory.service';
import { OdontogramService } from 'src/app/odontogram/services/odontogram.service';
import { RolesService } from '../../services/roles/roles.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  TitleOnlyForm: string;

  ModalType: string;
  ModalForm: FormGroup;
  //Modals para el manejo de citas
  createAppoinment: boolean = false;
  editAppoinment: boolean = false;
  viewAppoinment: boolean = false;
  viewAppoinmentDoctor: boolean = false;
  person:string = '';
  person2:string = '';
  text:string = '';
  observation:string = '';
  appoinmentId: string;
  dateSelect: string;
  read: boolean = false;
  public pacientes: Array<any> = [];
  public doctores: Array<any> = [];
  color:any[] = [];
  searchId: string = '';
  //Modals para el odontograma
  createOdontogram: boolean = false;
  editOdontogram: boolean = false;
  faceTooth: string;

  //modals para asignar role
  public loading: boolean=false;
  private image: any;
  color2: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;
  title: string;
  status : boolean = false;
  newUser : boolean = false;
  public disabled:boolean = true;
  public disabledRole:boolean = true;
  public cssBorder: string = '#E85757 solid';
  public roleSelect: string = '';
  public emailSelect: string = '';
  public user: string;
  public rol: string;
  public roles: any[] = [];
  public procedimientos: Array<any> = [
    {id: '822ACB87-6B9C-4B1B-BC55-24DA2CD741D0', name: 'Endodoncia', color:"#ffa200"},
    {id: '8433F368-67E9-4D4F-9041-2EC68B3E7A6E', name: 'Ausencia', color:"#942529"},
    {id: '2F91F771-71F6-451D-95FF-721A4B10A37B', name: 'Caries', color:"#ff0000"},
    {id: '4407B1E0-C776-4250-8BCE-7DB89751C773', name: 'Corona', color:"#fbff00"},
    {id: '635B3A46-AFD6-42CA-B26C-8DFFFF2178E7', name: 'Resina', color:"#1eff00"},
    {id: 'B370E5E6-E4AF-4F1B-B7F5-937B49D0A573', name: 'Implante', color:"#00f7ff"},
    {id: '7B46D315-0CB2-4664-BB75-98196DEC9A89', name: 'Diente Sano', color:"#cc00ff"},
    {id: '4A14FE10-6306-4231-86CC-EE295D8E9E3D', name: 'Amalgama', color:"#7700ff"},
    {id: 'A5C1BA46-B905-4D04-BB03-F82738E14619', name: 'Sellante', color:"#ff00dd"},
    {id: '5AD70C92-0D0C-4CAB-BADB-9AECE7C54A14', name: 'Provisional', color:"#4c4bad"},
    {id: 'F9DA0368-CD42-4D1B-A28C-B4840F6F84A1', name: 'Extraccion indicada', color:"#127043"},
    {id: '37965545-33C0-4671-BB4C-CD92A800FB03', name: 'Otros', color:"#524f4f"},
  ]
  public tipoDocumentos: Array<any> = [
    {id: '1C6F9914-535F-4686-92EC-93AACF89CCA8', name: 'Tarjeta de Identidad'},
    {id: '2F3D1BF6-4513-408A-83E5-91B5A5A04F92', name: 'Cedula de Extranjeria'},
    {id: 'C71DAF1B-D4B1-406D-9765-E46DC3D5817F', name: 'Pasaporte'},
    {id: 'E2AA60DE-722C-48A8-BE19-B042871F399A', name: 'Numero de Identificacion personal'},
    {id: 'FBD9D178-6915-4523-ACF3-3C2FC4C36739', name: 'Cedula de Ciudadania'},
    {id: 'FDB4977C-FAD8-4291-A8B0-7E2EBE433CF9', name: 'Numero de Identificacion tributaria'}
  ]

  //modal para lista de usuarios
  listUsers : boolean = false;
  public detailsUser = [];
  imageError: string;
  isImageSaved: boolean;
  typeImage: string = '';
  public cardImageBase64: string;
  public imagenDashboard : string;
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
   public template : string = 'assets/img/insert-imagen.png';

  //para registros de odontograma
  public count:number = 0;
  odontogramRegister: boolean = false;
  public id: string;
  constructor(
    // private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ModalComponent>,
    private _RolesService : RolesService,
    private _OdontogramService : OdontogramService,
    private _ClinicHistoryService : ClinicHistoryService,
    @Inject(MAT_DIALOG_DATA) data:any,
    ) {  

      this.TitleOnlyForm = data.title;
      this.ModalType = data.Modal;
      this.ModalForm = this.FormDefault();
      this.text = data.text;
      this.observation = data.observation;
      this.person = data.person;
      this.person2 = data.person2;
      this.appoinmentId = data;
      this.user = data.user;
      this.rol = data.rol;
      this.id = data.iduser;
      this.fullName = data.fullName;
      this.email = data.email;
      this.username = data.username;
      this.phoneNumber = data.phoneNumber;
      this.phoneEmergency = data.phoneEmergency;
      this.contactEmergency = data.contactEmergency;
      this.addresContact = data.addresContact;
      this.centerEmergency = data.centerEmergency;
      this.eps = data.eps;
      this.dateBirth = data.dateBirth;
      this.city = data.city;
      this.address = data.address;
      this.gender = data.gender;
      this.document = data.document;
      this.height = data.height;
      this.weight = data.weight;
      this.rh = data.rh;
      this.bloodType = data.bloodType;
      this.typeDocumentId = data.typeDocumentId;
      this.dateSelect = data.dateSelect;
      this.searchId = data.id;
      this.faceTooth = data.faceTooth;

  }

  getUsersWithRole(rolName:string){
    let token = JSON.parse(localStorage.getItem("Token"));
    this._RolesService.getUsersOfRole(rolName, token)
    .subscribe((res:any)=>{
      if(rolName == "Paciente"){
        res.map((i:any) =>{
          let objPacientes = {
            id: i.id,
            fullName: i.fullName,
            email: i.email
          }
          this.pacientes.push(objPacientes)
        }) 
        
      } else if(rolName == "Doctor"){
        res.map((i:any) =>{
          let objDoctores = {
            id: i.id,
            fullName: i.fullName,
            email: i.email
          }
          this.doctores.push(objDoctores) 
        })   
    }
  })
}

// getTypeProcess(){
//   this._OdontogramService.getTypeProcess()
//   .subscribe((res:any)=>{
//       this.procedimientos.push(res)
//       console.log(this.procedimientos)  
//   })
// }

  getRoles(){
    let token = JSON.parse(localStorage.getItem("Token"));
    this._RolesService.getRoles(token)
    .subscribe((res:any)=>{
      res.map((i:any) =>{
        let obj = {
          id: i.id,
          name: i.name,
        }
        this.roles.push(obj)
      })  
    })
  }

  getDetailsIdUser() {
    let token = JSON.parse(localStorage.getItem("Token"));
    this._ClinicHistoryService.getDetailsIdUser(this.id, token)
      .subscribe((res: any) => {
       
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
      },500)
     
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
            this.imageError = 'Solo se permiten imagenes en formato ( JPG | PNG )';
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

  ngOnInit(): void {

if(this.ModalType == 'createAppoinment'){
  this.createAppoinment = true;
  this.ModalForm = this.FormCreateAppoinment();
  this.getRoles();
  this.getUsersWithRole('Paciente')
  this.getUsersWithRole('Doctor') //hace falta mandarle aqui el parametro del rol

}

if(this.ModalType == 'editAppoinment'){
  this.editAppoinment = true;
  this.ModalForm = this.FormEditAppoinment();
  this.getRoles();
  this.getUsersWithRole('Paciente')
  this.getUsersWithRole('Doctor') //hace falta mandarle aqui el parametro del rol
}
if(this.ModalType == 'viewAppoinment'){
  this.viewAppoinment = true;
  this.ModalForm = this.FormViewAppoinment();

}
if(this.ModalType == 'viewAppoinmentDoctor'){
  this.viewAppoinmentDoctor = true;
  this.ModalForm = this.FormViewAppoinmentDoctor();

}

if(this.ModalType == 'createOdontogram'){
  this.createOdontogram = true;
  this.ModalForm = this.FormCreateOdontogram();
  this.faceTooth = '';
  // this.getTypeProcess();
  }

  if(this.ModalType == 'editOdontogram'){
    this.createOdontogram = true;
    this.ModalForm = this.FormEditOdontogram();
    // this.getTypeProcess();
  
    }
    if(this.ModalType == 'status'){
      this.status = true;
      this.ModalForm = this.FormStatus();
      this.getRoles();
    }
    if(this.ModalType == 'newUser'){
      this.newUser = true;
      this.ModalForm = this.FormNewUser();
      this.getRoles();
    }
    if(this.ModalType == 'odontogramRegister'){
      this.odontogramRegister = true;
      this.ModalForm = this.FormOdontogramRegister();
    }
    
    setTimeout(()=>{
    if(this.ModalType == 'listUsersRegister'){
      this.listUsers = true;
      this.ModalForm = this.FormListUsers();
      this.getDetailsIdUser();
    }
  },0)
  
}

  onSubmitForm(optType:string='') {
      let dto ={
        optType: optType,
        data:this.ModalForm.value
      }
      this.dialogRef.close(dto);
  } 

  close() {
      this.dialogRef.close();
  }

  FormDefault(){
    return new FormGroup({});
  }

  //formularios de modales para el calendario
  FormCreateAppoinment(){
    let date:string='';
    let time:string='';
    date = this.dateSelect[0];
    if(this.dateSelect.length==2){
      time = this.dateSelect[1];
    }
    return new FormGroup({
      date:new FormControl(date,[Validators.required]),
      hour:new FormControl(time,[Validators.required]),
      Title:new FormControl('',[Validators.required]),
      Text:new FormControl('',[Validators.required]),
      Paciente:new FormControl('',[Validators.required]),
      Doctor:new FormControl('',[Validators.required]),
    });
  }

  FormEditAppoinment(){
    let date:string='';
    let time:string='';
    let text:string ='';
    let observation:string = '';
    observation = this.observation;
    text = this.text;
    date = this.dateSelect[0];
    if(this.dateSelect.length==2){
      time = this.dateSelect[1];
    }
    return new FormGroup({
      date:new FormControl(date,[Validators.required]),
      hour:new FormControl(time,[Validators.required]),
      Title:new FormControl(text,[Validators.required]),
      Text:new FormControl(observation,[Validators.required]),
      Paciente:new FormControl('',[Validators.required]),
      Doctor:new FormControl('',[Validators.required])
    });
  }

  FormViewAppoinment(){
    let date:string='';
    let time:string='';
    let text:string ='';
    let observation:string = '';
    observation = this.observation;
    text = this.text;
    date = this.dateSelect[0];
    if(this.dateSelect.length==2){
      time = this.dateSelect[1];
    }
    return new FormGroup({
      date:new FormControl({value: date, disabled:true},[Validators.required]),
      hour:new FormControl({value: time, disabled:true},[Validators.required]),
      Title:new FormControl({value: text, disabled:true},[Validators.required]),
      Text:new FormControl({value: observation, disabled:true},[Validators.required]),
    });
  }
  FormViewAppoinmentDoctor(){
    let date:string='';
    let time:string='';
    let text:string ='';
    let observation:string = '';
    observation = this.observation;
    text = this.text;
    date = this.dateSelect[0];
    if(this.dateSelect.length==2){
      time = this.dateSelect[1];
    }
    return new FormGroup({
      date:new FormControl({value: date, disabled:true},[Validators.required]),
      hour:new FormControl({value: time, disabled:true},[Validators.required]),
      Title:new FormControl({value: text, disabled:true},[Validators.required]),
      Text:new FormControl({value: observation, disabled:true},[Validators.required]),
    });
  }

  //formularios de modales para el odontograma
  FormCreateOdontogram(){
    return new FormGroup({
      ToothId: new FormControl(),
      FaceToothId:new FormControl(),
      typeProcessId:new FormControl(),
      color:new FormControl(),
      observacion:new FormControl(),
    });
  }

  FormEditOdontogram(){
    return new FormGroup({
      ToothId: new FormControl(),
      FaceToothId:new FormControl(),
      typeProcessId:new FormControl(),
      color:new FormControl(),
      observacion:new FormControl(),
    });
  }
  FormStatus(){
    return new FormGroup({
      confirm:new FormControl('',[Validators.required]),
    });
  }

  FormNewUser(){
    return new FormGroup({
      idUser: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      rolname: new FormControl('',[Validators.required]),
    });
  }

  FormOdontogramRegister(){
    return new FormGroup({
      observation: new FormControl('',[Validators.required, Validators.minLength(30)]),
    });
  }

  FormListUsers(){
    return new FormGroup({
    fullName: new FormControl(this.fullName,[Validators.required]),
    UserName: new FormControl(this.username,[Validators.required]),
    Email: new FormControl(this.email,[Validators.required] ),
    // PasswordHash: new FormControl('',[Validators.required] ),
    PhoneNumber: new FormControl(this.phoneNumber,[Validators.required] ),
    phoneEmergency: new FormControl(this.phoneEmergency,[Validators.required] ),
    contactEmergency: new FormControl(this.contactEmergency,[Validators.required] ),
    addresContact: new FormControl(this.addresContact,[Validators.required] ),
    eps: new FormControl(this.eps,[Validators.required] ),
    dateBirth: new FormControl(this.dateBirth,[Validators.required] ),
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
  validatorRole(event:any){
    this.roleSelect=event.target.value;
    if(this.roleSelect!=''){
      this.disabledRole = false;
    }else{
      this.disabledRole = true;
    }
  }

  validatorRead(event:any){
    if(event.target.value.toLocaleUpperCase()==this.user.toLocaleUpperCase()){
      if(!this.disabledRole){
        this.emailSelect=event.target.value;
        this.disabled = false;
      }
      this.cssBorder = '#9DD543 solid';
    }else{
      this.disabled = true;
      this.cssBorder = '#E85757 solid';
    }
  }

  countChart(event:any){
    let input:string = event.target.value; 
    this.count = input.length;
  }
}
