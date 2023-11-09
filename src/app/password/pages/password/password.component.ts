import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { resetReq } from 'src/app/missing/models/reset.class';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { passReq } from '../../models/password.class';
import { PasswordService } from '../../services/password.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  formPassword : FormGroup;
  public equals : boolean = false;
  
  constructor(private _AlertsService : AlertsService,private _snackBar: MatSnackBar, private _PasswordService : PasswordService,private _router: ActivatedRoute,) {
    this.formPassword = this.createFormGroupPassword();
  }

  ngOnInit(): void {
  }

  createFormGroupPassword() {
    return new FormGroup({
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
      password2: new FormControl('', [Validators.required,Validators.minLength(8)])
    });
  }

  sendPassword(): any {
    if (this.formPassword.valid) {
      let body = new passReq();
      let codeParam = this.getToken();
      body.Email = codeParam.email;
      body.Password = this.formPassword.value.password;
      this._PasswordService.passwordUser(body,codeParam.token)
      .subscribe((response : any)=>{
        200
        this._AlertsService.successAlert('Ya puedes iniciar sesión nuevamente', `Cambio de contraseña exitoso`)
        .then((res:any)=>{
          if(res.isConfirmed){
            this.formPassword.reset();
          }
        })
      }, Error =>{
        500
        this._AlertsService.errorAlert('Por favor, ponte en contacto con el administrador', `Error inesperado`)
        406
        this._AlertsService.errorAlert('Por favor, verifica la información que estas ingresando', `¡Este usuario ya esta registrado!`)
      })
    }
    else {
      console.log('Formulario invalido');
    }

  }

  search(){
    if (this.formPassword.value.password !== this.formPassword.value.password2){
      this.equals = false;
      this._snackBar.open('Las contraseñas no coinciden, ¡Verifica!', 'Ok', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
        panelClass: ['error-scanck-bar'],
      });
    }else{
      this.equals = true;
    }
}

  getToken():resetReq{
    let body = new resetReq();
    this._router.queryParams.subscribe((params:any) =>{
     body.email = params.email;
     body.token = params.token;
    });
    return body;
  }
}
