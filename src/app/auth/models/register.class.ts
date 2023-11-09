export class RegisterReq{
  fullname?   : string    ;
  username?   : string    ;
  email?     : string    ;
  password? : string    ;
  imagenPerfil : {
    Data: string,
    Name: string,
    Extension: string
}
}

export interface ResponseLogin{
  status  :   string  ,
  responce:   string
}