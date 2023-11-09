import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listUsers',
  templateUrl: './listUsers.component.html',
  styleUrls: ['./listUsers.component.css']
})
export class ListUsersComponent implements OnInit {

  public tableProps = {
    title: 'Solicitudes',
    firstColum: 'Email',
    secondColum: 'Usuario',
    thirdColum: 'Nombre Completo',
    fourthColum: 'Acciones',
    firstBottom: 'Ver',
    secondBottom: 'Eliminar'
  }
  
  constructor() { }

  ngOnInit() {
  }

  

}
