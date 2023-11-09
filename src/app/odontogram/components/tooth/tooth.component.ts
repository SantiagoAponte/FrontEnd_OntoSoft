import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OdontogramService } from '../../services/odontogram.service';

@Component({
  selector: 'app-tooth',
  templateUrl: './tooth.component.html',
  styleUrls: ['./tooth.component.css']
})
export class ToothComponent implements OnInit {
  private dialogConfig = new MatDialogConfig();
  @Input() tooth: any;
  @Input() observacion:any;
  public cssFace: any;
  public cssFace2: any;
  public cssFace3: any;
  public cssFace4: any;
  public cssFace5: any;
  typeProcessTooth = [];
  observaciones = [];

  constructor(
    public dialog: MatDialog,
    public _OdontogramService: OdontogramService

  ) {
    // this.getLocalStorage()
  }

  ngOnInit(): void {

  }
  // getLocalStorage(){
  //   this.typeProcessTooth = JSON.parse(localStorage.getItem("typeProcessTooth"));
  //   this.observaciones = JSON.parse(localStorage.getItem("observaciones"));
  // } 
  saveLocalStorage(name:string,obj:any){
    localStorage.setItem(name, JSON.stringify(obj));
    localStorage.setItem(name, JSON.stringify(obj));
    // localStorage.setItem("FaceToothId", JSON.stringify(res.data.FaceToothId));
  }

  editOdontogram(faceTooth: string) {
    //  this.appoinmentId = clickInfo.event._def.publicId;
    this.dialogConfig.disableClose = false;
    let titleModal: string;
    titleModal = 'Editar Procedimiento en Diente';
    // console.log(this.typeUser);
    // if(this.typeUser.Recepcionista){
    //   titleModal = 'Editar Cita'
    // } 
    // if(this.typeUser.SuperAdmin){
    //   titleModal = 'Editar Cita'
    // }
    this.dialogConfig.data = {
      title: titleModal,
      Modal: 'editOdontogram',
      faceTooth: faceTooth,
    };
    this.openModal(faceTooth);
  };

  createOdontogram(faceTooth: string) {
    this.dialogConfig.disableClose = true;
    let titleModal: string;
    let observaciones:string;
    // if(this.typeUser.Recepcionista){
    titleModal = 'Registrar procedimiento en Diente',
      // } 
      // if(this.typeUser.SuperAdmin){
      //   titleModal = ''
      // }
      // if(this.typeUser.asesor){
      //   titleModal = ''
      // }

      this.dialogConfig.data = {
        title: titleModal,
        Modal: 'createOdontogram',
        faceTooth: faceTooth,
        observacion: observaciones
      };
    this.openModal(faceTooth);
  }

  openModal(faceTooth: string): void {

    this.dialogConfig.autoFocus = true;
    let customWidth: string;
   

    if (window.innerWidth <= 600) {
      customWidth = '100%';
    } else {
      customWidth = '25%';
    }
    this.dialogConfig.width = customWidth;
    const dialogRef = this.dialog.open(ModalComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (typeof res != 'undefined') {
        if (res.optType === 'editOdontogram') {
        }
        if (res.optType === 'createOdontogram') {
    
           if(res.data.typeProcessId === '822ACB87-6B9C-4B1B-BC55-24DA2CD741D0' && faceTooth === '5F7B056A-5DB1-46D7-ADFE-E4C631E2B84E'|| res.data.ToothId === null  ){
            res.data.color = this.cssFace = '#ffa200';
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
   
          }
         else if(res.data.typeProcessId === '822ACB87-6B9C-4B1B-BC55-24DA2CD741D0' && faceTooth === '01A8AE2B-F097-4D97-AA1B-5DEF8D14CD8D' || res.data.ToothId === null  ){
            res.data.color =  this.cssFace2 = '#ffa200';
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
  
          }
          else if(res.data.typeProcessId === '822ACB87-6B9C-4B1B-BC55-24DA2CD741D0' && faceTooth === 'CC51D043-2EAF-43D2-BCF0-64602D4040EF'|| res.data.ToothId === null  ){
            res.data.color = this.cssFace3 = '#ffa200';
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
      
            }
          else if(res.data.typeProcessId === '822ACB87-6B9C-4B1B-BC55-24DA2CD741D0' && faceTooth === '677BC05D-4BC5-463C-93F7-88B4852746BE'|| res.data.ToothId === null ){
            res.data.color = this.cssFace4 = '#ffa200';
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
    
            }
          else if(res.data.typeProcessId === '822ACB87-6B9C-4B1B-BC55-24DA2CD741D0' && faceTooth === 'E9C8DA3A-7773-4B83-85AA-8E3258ECB857'|| res.data.ToothId === null  ){
            res.data.color = this.cssFace5 = '#ffa200';
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
      
            }
          
           if(res.data.typeProcessId === '8433F368-67E9-4D4F-9041-2EC68B3E7A6E' && faceTooth === '5F7B056A-5DB1-46D7-ADFE-E4C631E2B84E' || res.data.ToothId === null ){
              res.data.color =  this.cssFace = "#942529";
              res.data.FaceToothId = faceTooth;
              res.data.ToothId = this.tooth.id;
     
            }
            else if(res.data.typeProcessId === '8433F368-67E9-4D4F-9041-2EC68B3E7A6E' && faceTooth === '01A8AE2B-F097-4D97-AA1B-5DEF8D14CD8D' || res.data.ToothId === null ){
              res.data.color =  this.cssFace2 = "#942529";
              res.data.FaceToothId = faceTooth;
              res.data.ToothId = this.tooth.id;
    
            }
           else if(res.data.typeProcessId === '8433F368-67E9-4D4F-9041-2EC68B3E7A6E' && faceTooth === 'CC51D043-2EAF-43D2-BCF0-64602D4040EF'|| res.data.ToothId === null ){
            res.data.color = this.cssFace3 = "#942529";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
 
            }
            else if(res.data.typeProcessId === '8433F368-67E9-4D4F-9041-2EC68B3E7A6E' && faceTooth === '677BC05D-4BC5-463C-93F7-88B4852746BE' || res.data.ToothId === null){
              res.data.color =  this.cssFace4 = "#942529";
              res.data.FaceToothId = faceTooth;
              res.data.ToothId = this.tooth.id;
       
            }
           else if(res.data.typeProcessId === '8433F368-67E9-4D4F-9041-2EC68B3E7A6E' && faceTooth === 'E9C8DA3A-7773-4B83-85AA-8E3258ECB857'|| res.data.ToothId === null ){
            res.data.color = this.cssFace5 = "#942529";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
   
            }

           if(res.data.typeProcessId === '2F91F771-71F6-451D-95FF-721A4B10A37B' && faceTooth === '5F7B056A-5DB1-46D7-ADFE-E4C631E2B84E'|| res.data.ToothId === null ){
              res.data.color =  this.cssFace = "#ff0000";
              res.data.FaceToothId = faceTooth;
              res.data.ToothId = this.tooth.id;

            }
            else if(res.data.typeProcessId === '2F91F771-71F6-451D-95FF-721A4B10A37B' && faceTooth === '01A8AE2B-F097-4D97-AA1B-5DEF8D14CD8D'|| res.data.ToothId === null ){
              res.data.color =  this.cssFace2 = "#ff0000";
              res.data.FaceToothId = faceTooth;
         
            }
            else if(res.data.typeProcessId === '2F91F771-71F6-451D-95FF-721A4B10A37B' && faceTooth === 'CC51D043-2EAF-43D2-BCF0-64602D4040EF'|| res.data.ToothId === null ){
              res.data.color =   this.cssFace3 = "#ff0000";
              res.data.FaceToothId = faceTooth;
              res.data.ToothId = this.tooth.id;
      
            }
            else if(res.data.typeProcessId === '2F91F771-71F6-451D-95FF-721A4B10A37B' && faceTooth === '677BC05D-4BC5-463C-93F7-88B4852746BE'|| res.data.ToothId === null ){
              res.data.color =  this.cssFace4 = "#ff0000";
              res.data.FaceToothId = faceTooth;
              res.data.ToothId = this.tooth.id;
       
            }
            else if(res.data.typeProcessId === '2F91F771-71F6-451D-95FF-721A4B10A37B' && faceTooth === 'E9C8DA3A-7773-4B83-85AA-8E3258ECB857'|| res.data.ToothId === null ){
              res.data.color =   this.cssFace5 = "#ff0000";
              res.data.FaceToothId = faceTooth;
              res.data.ToothId = this.tooth.id;
      
            }  
          
          if(res.data.typeProcessId === '4407B1E0-C776-4250-8BCE-7DB89751C773' && faceTooth === '5F7B056A-5DB1-46D7-ADFE-E4C631E2B84E'|| res.data.ToothId === null ){
            res.data.color =  this.cssFace = "#fbff00";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
       
          }
          else if(res.data.typeProcessId === '4407B1E0-C776-4250-8BCE-7DB89751C773' && faceTooth === '01A8AE2B-F097-4D97-AA1B-5DEF8D14CD8D'|| res.data.ToothId === null ){
            res.data.color =  this.cssFace2 = "#fbff00";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
       
          }
          else if(res.data.typeProcessId === '4407B1E0-C776-4250-8BCE-7DB89751C773' && faceTooth === 'CC51D043-2EAF-43D2-BCF0-64602D4040EF'|| res.data.ToothId === null ){
            res.data.color =  this.cssFace3 = "#fbff00";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
      
          }
          else if(res.data.typeProcessId === '4407B1E0-C776-4250-8BCE-7DB89751C773' && faceTooth === '677BC05D-4BC5-463C-93F7-88B4852746BE'|| res.data.ToothId === null ){
            res.data.color =  this.cssFace4 = "#fbff00";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
 
          }
          else if(res.data.typeProcessId === '4407B1E0-C776-4250-8BCE-7DB89751C773' && faceTooth === 'E9C8DA3A-7773-4B83-85AA-8E3258ECB857'|| res.data.ToothId === null ){
            res.data.color =  this.cssFace5 = "#fbff00";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
    
          }

         if(res.data.typeProcessId === '635B3A46-AFD6-42CA-B26C-8DFFFF2178E7' && faceTooth === '5F7B056A-5DB1-46D7-ADFE-E4C631E2B84E' || res.data.ToothId === null){
            res.data.color = this.cssFace = "#cc00ff";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
      
          }
         else if(res.data.typeProcessId === '635B3A46-AFD6-42CA-B26C-8DFFFF2178E7' && faceTooth === '01A8AE2B-F097-4D97-AA1B-5DEF8D14CD8D'|| res.data.ToothId === null ){
          res.data.color = this.cssFace2 = "#cc00ff";
          res.data.FaceToothId = faceTooth;
          res.data.ToothId = this.tooth.id;
      
          }
         else if(res.data.typeProcessId === '635B3A46-AFD6-42CA-B26C-8DFFFF2178E7' && faceTooth === 'CC51D043-2EAF-43D2-BCF0-64602D4040EF'|| res.data.ToothId === null){
          res.data.color = this.cssFace3 = "#cc00ff";
          res.data.FaceToothId = faceTooth;
          res.data.ToothId = this.tooth.id;
      
          }
         else if(res.data.typeProcessId === '635B3A46-AFD6-42CA-B26C-8DFFFF2178E7' && faceTooth === '677BC05D-4BC5-463C-93F7-88B4852746BE'|| res.data.ToothId === null ){
          res.data.color = this.cssFace4 = "#cc00ff";
          res.data.FaceToothId = faceTooth;
          res.data.ToothId = this.tooth.id;
    
          }
        else if(res.data.typeProcessId === '635B3A46-AFD6-42CA-B26C-8DFFFF2178E7' && faceTooth === 'E9C8DA3A-7773-4B83-85AA-8E3258ECB857' || res.data.ToothId === null ){
          res.data.color = this.cssFace5 = "#cc00ff";
          res.data.FaceToothId = faceTooth;
          res.data.ToothId = this.tooth.id;
    
          }
 
          else if(res.data.typeProcessId === 'B370E5E6-E4AF-4F1B-B7F5-937B49D0A573' || res.data.ToothId === null){
                                            
           res.data.color = this.cssFace = "#00f7ff";
           res.data.color = this.cssFace2 = "#00f7ff"; 
           res.data.color = this.cssFace3 = "#00f7ff";      
           res.data.color = this.cssFace4 = "#00f7ff"; 
           res.data.color = this.cssFace5 = "#00f7ff";
           res.data.FaceToothId = '42CD6425-6AC1-4904-894C-ABB31366627F';
           res.data.ToothId = this.tooth.id;
        
          }

          else if(res.data.typeProcessId === '7B46D315-0CB2-4664-BB75-98196DEC9A89'|| res.data.ToothId === null ){
                                             
            res.data.color = this.cssFace ="#1eff00";
            res.data.color = this.cssFace2 ="#1eff00"; 
            res.data.color = this.cssFace3 ="#1eff00";         
            res.data.color = this.cssFace4 ="#1eff00"; 
            res.data.color = this.cssFace5 ="#1eff00";
            res.data.FaceToothId = '42CD6425-6AC1-4904-894C-ABB31366627F';
            res.data.ToothId = this.tooth.id;
     
          }
          
          if(res.data.typeProcessId === '4A14FE10-6306-4231-86CC-EE295D8E9E3D' && faceTooth === '5F7B056A-5DB1-46D7-ADFE-E4C631E2B84E'|| res.data.ToothId === null ){
            res.data.color = this.cssFace = "#7700ff";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
       
          }
          else if(res.data.typeProcessId === '4A14FE10-6306-4231-86CC-EE295D8E9E3D' && faceTooth === '01A8AE2B-F097-4D97-AA1B-5DEF8D14CD8D'|| res.data.ToothId === null ){
            res.data.color = this.cssFace2 = "#7700ff";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
     
          }
          else if(res.data.typeProcessId === '4A14FE10-6306-4231-86CC-EE295D8E9E3D' && faceTooth === 'CC51D043-2EAF-43D2-BCF0-64602D4040EF' || res.data.ToothId === null ){
            res.data.color = this.cssFace3 = "#7700ff";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
          
          }
          else if(res.data.typeProcessId === '4A14FE10-6306-4231-86CC-EE295D8E9E3D' && faceTooth === '677BC05D-4BC5-463C-93F7-88B4852746BE'|| res.data.ToothId === null ){
            res.data.color = this.cssFace4 = "#7700ff";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
        
          }
          else if(res.data.typeProcessId === '4A14FE10-6306-4231-86CC-EE295D8E9E3D' && faceTooth === 'E9C8DA3A-7773-4B83-85AA-8E3258ECB857'|| res.data.ToothId === null){
            res.data.color = this.cssFace5 = "#7700ff";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
       
          }

          else if(res.data.typeProcessId === 'A5C1BA46-B905-4D04-BB03-F82738E14619' || res.data.ToothId === null){
                                              
            res.data.color = this.cssFace = "#ff00dd";
            res.data.color = this.cssFace2 = "#ff00dd";
            res.data.color = this.cssFace3 = "#ff00dd";        
            res.data.color = this.cssFace4 = "#ff00dd";
            res.data.color = this.cssFace5 = "#ff00dd";
            res.data.FaceToothId = '42CD6425-6AC1-4904-894C-ABB31366627F';
            res.data.ToothId = this.tooth.id;
       
          }
          if(res.data.typeProcessId === '5AD70C92-0D0C-4CAB-BADB-9AECE7C54A14' && faceTooth === '5F7B056A-5DB1-46D7-ADFE-E4C631E2B84E' || res.data.ToothId === null ){
            res.data.color = this.cssFace = "#4c4bad";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
        
          }
          else if(res.data.typeProcessId === '5AD70C92-0D0C-4CAB-BADB-9AECE7C54A14' && faceTooth === '01A8AE2B-F097-4D97-AA1B-5DEF8D14CD8D' || res.data.ToothId === null){
            res.data.color =  this.cssFace2 = "#4c4bad";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
      
          }
          else if(res.data.typeProcessId === '5AD70C92-0D0C-4CAB-BADB-9AECE7C54A14' && faceTooth === 'CC51D043-2EAF-43D2-BCF0-64602D4040EF'|| res.data.ToothId === null ){
            res.data.color = this.cssFace3 = "#4c4bad";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
   
          }
          else if(res.data.typeProcessId === '5AD70C92-0D0C-4CAB-BADB-9AECE7C54A14' && faceTooth === '677BC05D-4BC5-463C-93F7-88B4852746BE' || res.data.ToothId === null){
            res.data.color = this.cssFace4 = "#4c4bad";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
      
          }
          else if(res.data.typeProcessId === '5AD70C92-0D0C-4CAB-BADB-9AECE7C54A14' && faceTooth === 'E9C8DA3A-7773-4B83-85AA-8E3258ECB857' || res.data.ToothId === null){
            res.data.color = this.cssFace5 = "#4c4bad";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
      
          }

           if(res.data.typeProcessId === 'F9DA0368-CD42-4D1B-A28C-B4840F6F84A1' && faceTooth === '5F7B056A-5DB1-46D7-ADFE-E4C631E2B84E'|| res.data.ToothId === null ){
            res.data.color = this.cssFace = "#127043";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
   
          
          }
          else if(res.data.typeProcessId === 'F9DA0368-CD42-4D1B-A28C-B4840F6F84A1' && faceTooth === '01A8AE2B-F097-4D97-AA1B-5DEF8D14CD8D'|| res.data.ToothId === null ){
            res.data.color = this.cssFace2 = "#127043";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
      
         
          }
          else if(res.data.typeProcessId === 'F9DA0368-CD42-4D1B-A28C-B4840F6F84A1' && faceTooth === 'CC51D043-2EAF-43D2-BCF0-64602D4040EF' || res.data.ToothId === null){
            res.data.color = this.cssFace3 = "#127043";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
    
           
          }
          else if(res.data.typeProcessId === 'F9DA0368-CD42-4D1B-A28C-B4840F6F84A1' && faceTooth === '677BC05D-4BC5-463C-93F7-88B4852746BE' || res.data.ToothId === null){
            res.data.color = this.cssFace4 = "#127043";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
        
         
          }
          else if(res.data.typeProcessId === 'F9DA0368-CD42-4D1B-A28C-B4840F6F84A1' && faceTooth === 'E9C8DA3A-7773-4B83-85AA-8E3258ECB857' || res.data.ToothId === null){
            res.data.color = this.cssFace5 = "#127043";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
     
        
          }

          if(res.data.typeProcessId === '37965545-33C0-4671-BB4C-CD92A800FB03' && faceTooth === '5F7B056A-5DB1-46D7-ADFE-E4C631E2B84E' || res.data.ToothId === null ){
            res.data.color = this.cssFace = "#524f4f";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;

          
          }
          else if(res.data.typeProcessId === '37965545-33C0-4671-BB4C-CD92A800FB03' && faceTooth === '01A8AE2B-F097-4D97-AA1B-5DEF8D14CD8D' || res.data.ToothId === null){
            res.data.color = this.cssFace2 = "#524f4f";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
  
           
          }
          else if(res.data.typeProcessId === '37965545-33C0-4671-BB4C-CD92A800FB03' && faceTooth === 'CC51D043-2EAF-43D2-BCF0-64602D4040EF'|| res.data.ToothId === null ){
            res.data.color =  this.cssFace3 = "#524f4f";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
   
           
          }
          else if(res.data.typeProcessId === '37965545-33C0-4671-BB4C-CD92A800FB03' && faceTooth === '677BC05D-4BC5-463C-93F7-88B4852746BE' || res.data.ToothId === null){
            res.data.color = this.cssFace4 = "#524f4f";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
  
         
          }
          else if(res.data.typeProcessId === '37965545-33C0-4671-BB4C-CD92A800FB03' && faceTooth === 'E9C8DA3A-7773-4B83-85AA-8E3258ECB857' || res.data.ToothId === null){
            res.data.color = this.cssFace5 = "#524f4f";
            res.data.FaceToothId = faceTooth;
            res.data.ToothId = this.tooth.id;
          }
          this.observaciones = JSON.parse(localStorage.getItem("observation"))
          this.typeProcessTooth = JSON.parse(localStorage.getItem("typeProcessTooth"))
            let obj = {
              ToothId: res.data.ToothId,
              typeProcessId: res.data.typeProcessId,
              FaceToothId: res.data.FaceToothId
            }
            let observacion = { observation: res.data.observacion + ","};

            if(this.typeProcessTooth === null || this.typeProcessTooth === undefined){
                this.typeProcessTooth = [];
            }
            if(this.observaciones === null || this.observaciones === undefined){
              this.observaciones = [];
          }
            this.typeProcessTooth.push(obj);
            this.observaciones.push(observacion);
            this.saveLocalStorage('typeProcessTooth', this.typeProcessTooth)
            this.saveLocalStorage('observation', this.observaciones)

           //VALIDA LA LOGICA PARA LIMPIAR LOS REGISTROS Y PINTA LOS DIENTES EN BLANCO
          if(res.data.typeProcessId === null && res.data.observacion === null){                                
            res.data.color = this.cssFace =  "#ffffff";
            res.data.color = this.cssFace2 = "#ffffff";
            res.data.color = this.cssFace3 = "#ffffff";        
            res.data.color = this.cssFace4 = "#ffffff";
            res.data.color = this.cssFace5 = "#ffffff";
            console.log('Se limpiaron los registros')
            localStorage.removeItem('typeProcessTooth');
            localStorage.removeItem('observation');
            // res.data.FaceToothId = '42CD6425-6AC1-4904-894C-ABB31366627F';
            // res.data.ToothId = this.tooth.id;
          } 
          
        }
        if (res.optType === 'delete') {
        }
      }
    })
  }

}