import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { passReq } from 'src/app/password/models/password.class';
import { PasswordService } from 'src/app/password/services/password.service';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { SessionService } from 'src/app/shared/services/session/session.service';

@Component({
  selector: 'app-resetPasswordRecepcionist',
  templateUrl: './resetPasswordRecepcionist.component.html',
  styleUrls: ['./resetPasswordRecepcionist.component.css']
})
export class ResetPasswordRecepcionistComponent implements OnInit {

  formPassword : FormGroup;
  public equals : boolean = false;
  constructor(private _AlertsService : AlertsService,
  private _snackBar: MatSnackBar,
  private _PasswordService : PasswordService,
  private _SessionService: SessionService) {
      
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
   let token = JSON.parse(localStorage.getItem("Token"));
    let helper = new JwtHelperService(token);
    const decodedToken = helper.decodeToken(token);
    if (this.formPassword.valid) {
      let user = { 
        Id : decodedToken.sub,
        UserName : decodedToken.nameid,
        Email : decodedToken.email,
        fullName : decodedToken.name,
        rol : decodedToken.role
      }
      let body = new passReq();
      body.Email = user.Email;
      body.Password = this.formPassword.value.password;
      this._PasswordService.passwordOfDashboard(body, token)
      .subscribe((response : any)=>{
        200
        this._AlertsService.successAlert('Cambio de contraseña exitoso', `Aceptar`)
        .then((res:any) => {
          if(res.isConfirmed){
            localStorage.setItem('Token',JSON.stringify(response.token));
          }
        })
      }, (Error:any) =>{
        500
        this._AlertsService.errorAlert('Por favor, ponte en contacto con el administrador', `Error inesperado`)
        406
        this._AlertsService.errorAlert('Por favor, verifica la información que estas ingresando, Este usuario ya esta registrado', `Aceptar`)
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

}
