export interface taskPutUserDetails {
    email: string,
    fullName: string,
    username: string,
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
    typeDocumentId: [string],
    imagenPerfil: {
        Data: string,
        Name: string,
        Extension: string
    }
}