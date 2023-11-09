import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ClinicHistoryService } from 'src/app/clinicHistory/services/clinicHistory.service';
import { RolesService } from 'src/app/shared/services/roles/roles.service';
import { findUser } from '../../interfaces/findUser';
import { OdontogramService } from '../../services/odontogram.service'

export interface idHistoryClinic {
  id:string;
}
@Component({
  selector: 'app-odontogram',
  templateUrl: './odontogram.component.html',
  styleUrls: ['./odontogram.component.css'],
})
export class OdontogramComponent implements OnInit {
  @Input() tooths1: any[]=[];
  @Input() tooths2: any[]=[];
  @Input() tooths3: any[]=[];
  @Input() tooths4: any[]=[];
  @Input() tooths5: any[]=[];
  @Input() tooths6: any[]=[];
  @Input() tooths7: any[]=[];
  @Input() tooths8: any[]=[];
  myControl = new FormControl();
  pacientes = [];
  filteredOptions: Observable<any[]>;
  private clinicHistoryIdTemp:any[] = [];
  private idUserTemp = [];
   clinicHistoryId:string = '';
   userId:string = '';
 

  constructor(
    public _OdontogramService:OdontogramService,
    public _RolesService:RolesService,
    public _ClinicHistoryService: ClinicHistoryService
    
    ) {}
    
    public textShow = '';
    
    getTooths(){
      let token = JSON.parse(localStorage.getItem("Token"));
      this._OdontogramService.getTooths(token)
      .subscribe((res:any)=>{
        let order1=[res[2],res[24],res[4],res[38],res[11],res[9],res[10],res[42]] //dientes parte superior izquierda
        let order2=[res[39],res[50],res[7],res[30],res[28],res[0],res[47],res[6]] //dientes parte superior derecha
        let order3=[res[18],res[12],res[14],res[35],res[5]] //dientes parte superior central izquierda
        let order4=[res[13],res[41],res[19],res[1],res[16]] //dientes parte superior central derecha
        let order5=[res[45],res[51],res[46],res[15],res[40]] //dientes parte inferior central izquierda
        let order6=[res[3],res[17],res[48],res[8],res[23]] //dientes parte inferior central derecha
        let order7=[res[29],res[34],res[44],res[32],res[49],res[26],res[36],res[20]] //dientes parte inferior izquierda
        let order8=[res[21],res[37],res[43],res[31],res[25],res[27],res[22],res[33]] //dientes parte infeerior derecha

        this.tooths1.push(order1)
        this.tooths2.push(order2)
        this.tooths3.push(order3)
        this.tooths4.push(order4)
        this.tooths5.push(order5)
        this.tooths6.push(order6)
        this.tooths7.push(order7)
        this.tooths8.push(order8) 
  })
}

getUsersWithRole(rolName:string){
  let token = JSON.parse(localStorage.getItem("Token"));
  this._RolesService.getUsersOfRole(rolName, token)
  .subscribe((res:any)=>{
    if(rolName == "Paciente"){
      res.map((i:any) =>{
        let response: findUser = {
          id: i.id,
          fullName: i.fullName,
        }
        this.pacientes.push(response) 
      }) 
      
    } 
  })
}
// getTitle(userId: string) {
//  this.pacientes.find(user => user.id === userId).id;
//   // localStorage.setItem('userId', JSON.stringify(user.id));
// }
// onSubmit() {
//   console.log(this.myControl.value);
// }

// seleccionar() {
//   //Obtener el valor desde la casilla de selección
//   var value = document.getElementById("id")
//   console.log(value);
//   // localStorage.setItem('userId', JSON.stringify());
// }
saveLocalStorage(name:string,obj:any){
  localStorage.setItem(name, JSON.stringify(obj));
}

  ngOnInit(): void {
     this.getTooths();
     this.getUsersWithRole('Paciente');
     this.filteredValue();
  }

  filteredValue(){
    this.filteredOptions = this.myControl.valueChanges
     .pipe(
       startWith(''),
       map(value => typeof value === 'string' ? value : value.id),
       map(name => name ? this._filter(name) : this.pacientes.slice())
     );
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


  displayFn2(options: findUser[]): (id: string) => string {
    return (id: string) => { 
      const correspondingOption = Array.isArray(options) ? options.find(option => option.id === id ) : null;
      this.idUserTemp.push(correspondingOption);
      return correspondingOption ? correspondingOption.fullName : '';
    }
  }
  saveIdUser(){
    this.userId = this.idUserTemp[1].id
    this.saveLocalStorage('userId', this.userId)
  }
  // displayFn(user: findUser): string {
  //   let obj =  user && user.fullName ? user.fullName : '';
  //   console.log(obj) //en esta variable se obtiene el id del usuario (enviar al local storage)
  //   return obj
  // }

  private _filter(name: string): findUser[] {
    const filterValue = name.toLowerCase();
    return this.pacientes.filter(option => option.fullName.toLowerCase().includes(filterValue));
  }


}
