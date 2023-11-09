import { Guid } from "guid-typescript";

export interface PutClinicHistory {
    phoneCompanion : string, 
        nameCompanion : string,
        dateRegister : Date,
        backgroundMedical : boolean,
        backgroundOral  : boolean,
        UserId : Guid,
        ListBackgroundMedical : [],
        ListBackgroundOral : [],
        
        IdPatient : Guid,
        observationPatient : string,
        dateCreate : Date,

        IdRadiography : Guid,
        observationRadiography : string,

        IdTreamentPlan : Guid,
        Name : string,
        observationTreamentPlan : string
    }