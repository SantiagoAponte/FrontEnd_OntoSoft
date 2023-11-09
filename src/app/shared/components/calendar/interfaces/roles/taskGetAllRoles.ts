import { Guid } from "guid-typescript";

export interface taskGetAllRoles {
    
        id: Guid
        name: string
        normalizedName: string
        concurrencyStamp: any 
}