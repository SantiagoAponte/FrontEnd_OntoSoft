import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';

import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { ROUTESDOCTOR, ROUTESPATIENT, ROUTESRECEPCIONIST, ROUTESSUPERADMIN } from '../sidebar/sidebar.component';
import { AlertsService } from '../../services/alerts/alerts.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
    // moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;

    public isCollapsed = true;
    @ViewChild("navbar-cmp", {static: false}) button;

    constructor(location:Location, private renderer : Renderer2, private element : ElementRef, private router: Router,private _AlertsService : AlertsService) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit(){
    let token = JSON.parse(localStorage.getItem("Token"));
    let helper = new JwtHelperService(token);
    const decodedToken = helper.decodeToken(token);

    let user = {
    Id : decodedToken.sub,
    UserName : decodedToken.nameid,
    Email : decodedToken.email,
    fullName : decodedToken.name,
    rol : decodedToken.role
   }
  if(user.rol === 'SuperAdmin'){
    this.listTitles = ROUTESSUPERADMIN.filter(listTitle => listTitle);
  } else if(user.rol === 'Paciente'){
    this.listTitles = ROUTESPATIENT.filter(listTitle => listTitle); 
  }
  else if(user.rol === 'Doctor'){
    this.listTitles = ROUTESDOCTOR.filter(listTitle => listTitle); 
  }else if(user.rol === 'Recepcionista'){
    this.listTitles = ROUTESRECEPCIONIST.filter(listTitle => listTitle); 
  }
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.router.events.subscribe((event) => {
          this.sidebarClose();
       });
    }
    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return '';
    }
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
      }
      sidebarOpen() {
          const toggleButton = this.toggleButton;
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          setTimeout(function(){
              toggleButton.classList.add('toggled');
          }, 500);

          html.classList.add('nav-open');
          if (window.innerWidth < 991) {
            mainPanel.style.position = 'fixed';
          }
          this.sidebarVisible = true;
      };
      sidebarClose() {
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          if (window.innerWidth < 991) {
            setTimeout(function(){
              mainPanel.style.position = '';
            }, 500);
          }
          this.toggleButton.classList.remove('toggled');
          this.sidebarVisible = false;
          html.classList.remove('nav-open');
      };
      collapse(){
        this.isCollapsed = !this.isCollapsed;
        const navbar = document.getElementsByTagName('nav')[0];
        if (!this.isCollapsed) {
          navbar.classList.remove('navbar-transparent');
          navbar.classList.add('bg-white');
        }else{
          navbar.classList.add('navbar-transparent');
          navbar.classList.remove('bg-white');
        }

      }
      logOutUser(){
        this._AlertsService.deleteAlert('¿Esta seguro que desea salir de la sesión?','Cerrar sesión')
        .then((res:any) => {
          if(res.isConfirmed){
          localStorage.clear();
          window.location.replace('/auth/login');
          }
        });
      }
}
