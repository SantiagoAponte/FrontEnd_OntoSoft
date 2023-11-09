import { Guid } from "guid-typescript"

export interface taskGetClinicHistoryIdUser {
    
        id: Guid,
        phoneCompanion: string,
        nameCompanion: string,
        dateRegister: Date,
        userDetails: {
            email: string,
            fullName: string,
            userName: string,
            phoneNumber: string,
            phoneEmergency: string,
            contactEmergency: string,
            addresContact: string,
            centerEmergency: string,
            eps: string,
            dateBirth: Date,
            city: string,
            address: string,
            gender: string,
            document: string,
            height: string,
            weight: string,
            rh: string,
            bloodType: string,
            typeDocumentId: Guid
        },
        odontograms: [
            
        ],
        backgroundMedical: boolean,
        backgroundMedicals: [
            {
                id: Guid,
                description: string
            }
        ],
        backgroundOral: boolean,
        backgroundOrals: [
            {
                id: Guid,
                description: string
            }
           
        ],
        oralRadiographies: [
            {
            id: Guid,
            observation: string,
            dateRegister: Date
            }
        ],
        treamentPlans: [
            {
            id: Guid,
            name: string,
            observation: string
            }
        ],
        patientEvolutions: [
            {
            id: Guid,
            observation: string,
            dateCreate: Date
            }
        ]
    
}