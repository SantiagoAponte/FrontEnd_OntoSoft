import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { findUser } from 'src/app/odontogram/interfaces/findUser';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { RolesService } from 'src/app/shared/services/roles/roles.service';
import { PostClinicHistory } from '../../interfaces/postClinicHistory';
import { PostOralRadiography } from '../../interfaces/postOralRadiography';
import { PostPatientEvolution } from '../../interfaces/postPatientEvolution';
import { postTreamentPlan } from '../../interfaces/postTreamentPlan';
import { taskGetAllBackgroundMedicals } from '../../interfaces/taskGetAllBackgroundMedicals';
import { taskGetUserDetails } from '../../interfaces/taskGetUserDetails';
import { ClinicHistoryService } from '../../services/clinicHistory.service';

@Component({
  selector: 'app-clinicHistory',
  templateUrl: './clinicHistory.component.html',
  styleUrls: ['./clinicHistory.component.css'],
})
export class ClinicHistoryComponent implements OnInit {
  isLinear = false;
  infoGeneralForm: FormGroup;
  backgroundsForm: FormGroup;
  radiographiesForm: FormGroup;
  treamentPlanForm: FormGroup;
  evolutionForm: FormGroup;
  myControl = new FormControl();
  pacientes = [];
  filteredOptions: Observable<any[]>;
  ListbackgroundMedicals = [];
  ListbackgroundOrals = [];
  public detailsUser = [];
  private clinicHistoryIdTemp:any[] = [];
  public idUserTemp = [];
  clinicHistoryId: string = '';
  userId: string = '';
  public birth: Date;

  constructor(private _RolesService: RolesService,
    private _ClinicHistoryService: ClinicHistoryService,
    private _AlertsService: AlertsService
  ) {
    this.infoGeneralForm = this.infoGeneralFormGroup();
    this.backgroundsForm = this.BackgroundsFormGroup();
    this.radiographiesForm = this.radiographiesFormGroup();
    this.treamentPlanForm = this.treamentPlanFormGroup();
    this.evolutionForm = this.evolutionFormGroup();
    // this.saveLocalStorage('clinicHistoryId', this.clinicHistoryId)
  }
  infoGeneralFormGroup() {
    return new FormGroup({
      date: new FormControl('', [Validators.required]),
      hour: new FormControl('', [Validators.required]),
      nameCompanion: new FormControl('', [Validators.required]),// añadirle los campos que faltan de info general.
      phoneCompanion: new FormControl('', [Validators.required]),
    });
  }

  BackgroundsFormGroup() {
    return new FormGroup({
      backgroundMedicals: new FormControl(),
      backgroundOrals: new FormControl(),
      disableSelectMedical : new FormControl({value: false, disabled: false}),
      disableSelectOral : new FormControl({value: false, disabled: false})
    });
  }

  radiographiesFormGroup() {
    return new FormGroup({
      observation: new FormControl('', [Validators.required]),
      date2: new FormControl('', [Validators.required]),
      hour2: new FormControl('', [Validators.required]),
      clinicHistoryId: new FormControl(),
    });
  }

  treamentPlanFormGroup() {
    return new FormGroup({
      Name: new FormControl('', [Validators.required]),
      observation: new FormControl('', [Validators.required]),
      clinicHistoryId: new FormControl(),
    });
  }

  evolutionFormGroup() {
    return new FormGroup({
      observation: new FormControl('', [Validators.required]),
      date3: new FormControl('', [Validators.required]),
      hour3: new FormControl('', [Validators.required]),
      clinicHistoryId: new FormControl(),
    });
  }

  getUsersWithRole(rolName: string) {
    let token = JSON.parse(localStorage.getItem("Token"));
    this._RolesService.getUsersOfRole(rolName, token)
      .subscribe((res: any) => {
        if (rolName == "Paciente") {
          res.map((i: any) => {
            let response: findUser = {
              id: i.id,
              fullName: i.fullName,
            }
            this.pacientes.push(response)
          })

        }
      })
  }
  getBackgroundMedicals() {
    let token = JSON.parse(localStorage.getItem("Token"));
    this._ClinicHistoryService.getBackgroundsMedical(token)
      .subscribe((res: any) => {
        res.map((i: any) => {
          let response: taskGetAllBackgroundMedicals = {
            id: i.id,
            description: i.description,
            clinicHistoryLink: null
          }
          this.ListbackgroundMedicals.push(response)
        })
      })
  }
  getBackgroundOrals() {
    let token = JSON.parse(localStorage.getItem("Token"));
    this._ClinicHistoryService.getBackgroundsOral(token)
      .subscribe((res: any) => {
        res.map((i: any) => {
          let response: taskGetAllBackgroundMedicals = {
            id: i.id,
            description: i.description,
            clinicHistoryLink: null
          }
          this.ListbackgroundOrals.push(response)
        })
      })
  }
 
  getDetailsIdUser() {
    let token = JSON.parse(localStorage.getItem("Token"));
    this._ClinicHistoryService.getDetailsIdUser(this.userId, token)
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
          imagenPerfil: res.imagenPerfil
        }
        this.detailsUser.push(response);
      })
  }

  postClinicHistory() {
    let token = JSON.parse(localStorage.getItem("Token"));
    if (this.infoGeneralForm.valid) {
      let fullDate = `${this.infoGeneralForm.value.date}T${this.infoGeneralForm.value.hour}:00`;
      let newFullDate = new Date(fullDate)
      let data = new PostClinicHistory();
      data.phoneCompanion = this.infoGeneralForm.value.phoneCompanion;
      data.nameCompanion = this.infoGeneralForm.value.nameCompanion;
      data.dateRegister = newFullDate;
      data.backgroundMedical = this.backgroundsForm.value.disableSelectMedical;
      data.backgroundOral = this.backgroundsForm.value.disableSelectOral;
      data.UserId = this.userId;
      data.ListBackgroundMedical = this.backgroundsForm.value.backgroundMedicals;
      data.ListBackgroundOral = this.backgroundsForm.value.backgroundOrals;
      this._ClinicHistoryService.PostClinicHistory(data, token)
        .subscribe(data => {
          200
          this._AlertsService.successAlert(`¡Se guardo la información en la historia clinica con exito!`, `Aceptar`,)
          .then((res:any)=> {
            if(res.isConfirmed){
              this.getClinicHistoryIdUser();
            }
          })
          // Entra aquí con respuesta del servicio correcta código http 200
        }, err => {
          // Entra aquí si el servicio entrega un código http de error EJ: 404,
          500
          this._AlertsService.warningAlert(`Ocurrio un error inesperado, comuniquese con el admnistrador`, `Error`, `Aceptar`)
          406
          this._AlertsService.warningAlert(`Debe seleccionar primero un usuario para registrar una historia clinica`, `Error`, `Aceptar`)
          400
          this._AlertsService.warningAlert(`No se pudo crear la historia clinica, revise la información digitada`, `Error`, `Aceptar`)
        })

    }
  }

  postPatientEvolution() {
    let token = JSON.parse(localStorage.getItem("Token"));
    let fullDate = `${this.infoGeneralForm.value.date3}T${this.infoGeneralForm.value.hour3}:00`;
      let newFullDate = new Date(fullDate)
      let data = new PostPatientEvolution();
      data.dateCreate = newFullDate;
      data.clinicHistoryId = this.clinicHistoryId;
      data.observation = this.evolutionForm.value.observation;
    this._ClinicHistoryService.PostPatientEvolution(data, token)
      .subscribe(data => {
        200
        this._AlertsService.successAlert(`¡Se guardo la evolución del paciente con éxito!`, `Aceptar`,)
      }, err => {
        // Entra aquí si el servicio entrega un código http de error EJ: 404,
        500
        this._AlertsService.warningAlert(`Ocurrio un error inesperado, comuniquese con el admnistrador`, `Error`, `Aceptar`)
        406
        this._AlertsService.warningAlert(`Asegurese de primero haber creado una historia clinica para el usuario.`, `Error`, `Aceptar`)
        400
        this._AlertsService.warningAlert(`No se pudo añadir el registro de Radiografia oral para el paciente, revise la información digitada`, `Error`, `Aceptar`)
      })
  }
  postOralRadiography() {
    let token = JSON.parse(localStorage.getItem("Token"));
    let fullDate = `${this.infoGeneralForm.value.date2}T${this.infoGeneralForm.value.hour2}:00`;
      let newFullDate = new Date(fullDate)
      let data = new PostOralRadiography();
      data.dateRegister = newFullDate;
      data.clinicHistoryId = this.clinicHistoryId;
      data.observation = this.radiographiesForm.value.observation;
    this._ClinicHistoryService.PostOralRadiography(data, token)
      .subscribe(data => {
        200
        this._AlertsService.successAlert(`¡Se guardo la información de la radiografía con éxito!`, `Aceptar`,)
      }, err => {
        // Entra aquí si el servicio entrega un código http de error EJ: 404,
        500
        this._AlertsService.warningAlert(`Ocurrio un error inesperado, comuniquese con el admnistrador`, `Error`, `Aceptar`)
        406
        this._AlertsService.warningAlert(`Asegurese de primero haber creado una historia clinica para el usuario.`, `Error`, `Aceptar`)
        400
        this._AlertsService.warningAlert(`No se pudo añadir la observación de evolución al paciente, revise la información digitada`, `Error`, `Aceptar`)
      })

  }
  postTreamentPlan() {
    let token = JSON.parse(localStorage.getItem("Token"));
      let data = new postTreamentPlan();
      data.Name = this.treamentPlanForm.value.Name;
      data.clinicHistoryId = this.clinicHistoryId;
      data.observation = this.treamentPlanForm.value.observation;
    this._ClinicHistoryService.PostTreamentPlan(data, token)
      .subscribe(data => {
        200
        this._AlertsService.successAlert(`¡Se guardo el plan de tratamiento con éxito!`, `Aceptar`,)
      }, err => {
        500
        this._AlertsService.warningAlert(`Ocurrio un error inesperado, comuniquese con el admnistrador`, `Error`, `Aceptar`)
        406
        this._AlertsService.warningAlert(`Asegurese de primero haber creado una historia clinica para el usuario.`, `Error`, `Aceptar`)
        400
        this._AlertsService.warningAlert(`No se pudo añadir el registro de Plan de tratamiento para el paciente`, `Error`, `Aceptar`)
      })

  }

  saveLocalStorage(name:string,obj:any){
    localStorage.setItem(name, JSON.stringify(obj));
  }

  ngOnInit(): void {
    this.getUsersWithRole('Paciente');
    this.getBackgroundMedicals();
    this.getBackgroundOrals();
    this.filteredValue();

  }
  // saveLocalStorage(name: string, obj: any) {
  //   localStorage.setItem(name, JSON.stringify(obj));
  // }

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
  getClinicHistoryIdUser(){
    let token = JSON.parse(localStorage.getItem("Token"));
    this._ClinicHistoryService.getClinicHistoryIdUser(this.idUserTemp[1].id, token)
    .subscribe((res:any)=>{
          this.clinicHistoryIdTemp.push(res.id) 
         this.clinicHistoryId = this.clinicHistoryIdTemp.toString();
         this.saveLocalStorage('clinicHistoryId', this.clinicHistoryId)
    })
}
  // displayFn(user: findUser): string {
  //   let obj =  user && user.id ? user.id : '';
  //   this.userId = obj;
  //   localStorage.setItem('userId', JSON.stringify(obj));
  //   console.log(obj) //en esta variable se obtiene el id del usuario (enviar al local storage)
  //   return obj
  // }
  private _filter(name: string): findUser[] {
    const filterValue = name.toLowerCase();
    return this.pacientes.filter(option => option.fullName.toLowerCase().includes(filterValue));
  }

}
