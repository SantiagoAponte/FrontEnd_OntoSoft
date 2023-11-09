import { Guid } from "guid-typescript";

export interface taskGetOdontogramIdUser {
    id: Guid,
    date_register: Date,
    observation: string,
    tooth: [
        {
            id: Guid,
            num: number,
            ubicacion: string,
            typeProcess: [
                {
                    id: Guid,
                    name: string
                }
            ],
            faceTooth: [
                {
                    id: Guid,
                    description: string
                }
            ]
        }
    ]
}