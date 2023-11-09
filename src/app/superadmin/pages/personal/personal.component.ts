import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  public tableProps = {
    title: 'Solicitudes',
    firstColum: 'Email',
    secondColum: 'Usuario',
    thirdColum: 'Acciones',
    firstBottom: 'Aceptar',
    secondBottom: 'Cancelar'
  }
  
  constructor() { }

  ngOnInit() {
  }

}
