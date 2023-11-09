import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalendarComponent } from "../shared/components/calendar/calendar.component";
import { ProfileRecepcionistComponent } from "./pages/profileRecepcionist/profileRecepcionist.component";
import { ResetPasswordRecepcionistComponent } from "./pages/resetPasswordRecepcionist/resetPasswordRecepcionist.component";


export const RecepcionistRoutes: Routes = [

    { path: 'profile/recepcionist', component: ProfileRecepcionistComponent ,pathMatch: 'full'},
    { path: 'calendar/recepcionist', component: CalendarComponent ,pathMatch: 'full'},
    { path: 'passwordReset/recepcionist', component: ResetPasswordRecepcionistComponent ,pathMatch: 'full'},

];
@NgModule({
    imports: [RouterModule.forChild(RecepcionistRoutes)],
    exports: [RouterModule]
  })
  export class RecepcionistRoutingModule { }
