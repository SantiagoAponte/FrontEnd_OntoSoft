import { Guid } from "guid-typescript";

export interface taskGetAll{
    id: Guid,
     date: Date,
    title: string,
    text: string,
    users: [{
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
        typeDocumentId: string
    }]
}
