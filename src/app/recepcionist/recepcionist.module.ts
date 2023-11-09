import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ProfileRecepcionistComponent } from "./pages/profileRecepcionist/profileRecepcionist.component";
import { ResetPasswordRecepcionistComponent } from "./pages/resetPasswordRecepcionist/resetPasswordRecepcionist.component";
import { RecepcionistRoutingModule } from "./recepcionist.routing.module";

@NgModule({
    imports: [
        CommonModule,
        RecepcionistRoutingModule,
        FormsModule,
        SharedModule,
    ],
    declarations: [
        ProfileRecepcionistComponent,
        ResetPasswordRecepcionistComponent
    ]
  })
  
  export class RecepcionistModule {}
  